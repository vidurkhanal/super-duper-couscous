import "reflect-metadata";
require("dotenv-safe").config();
import Express, { Request, Response } from "express";
import {
  COOKIE_NAME,
  PWD_REDIS_CLIENT_HOST,
  PWD_REDIS_PASSWORD,
  SESSIONS_REDIS_CLIENT_HOST,
  SESSIONS_REDIS_PASSWORD,
  __PORT__,
  __PROD__,
} from "./constants";
import morgan from "morgan";
import { createConnection } from "typeorm";
import { User } from "./models/user";
import { Credential } from "./models/credential";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/User";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import { ApolloContext } from "./types";
import cors from "cors";
import { CredentialResolver } from "./resolvers/Credential";
import helmet from "helmet";
import { verifiedPageTemplate } from "./static/verifiedPageTemplate";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Credential],
  });
  await conn.runMigrations();
  const app = Express();
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://super-duper-couscous.vercel.app",
      ],
    })
  );
  const redisClient = new Redis({
    port: 11173,
    host: SESSIONS_REDIS_CLIENT_HOST,
    password: SESSIONS_REDIS_PASSWORD,
    db: 0,
  });
  const redisStore = connectRedis(session);
  const PwdRedisClient = new Redis({
    port: 13762,
    host: PWD_REDIS_CLIENT_HOST,
    password: PWD_REDIS_PASSWORD,
    db: 0,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new redisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      name: COOKIE_NAME,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 157784760000,
        httpOnly: true,
        secure: __PROD__,
        sameSite: "lax",
      },
    })
  );

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, CredentialResolver],
      validate: false,
    }),
    context: ({ req, res }): ApolloContext => ({
      req,
      res,
      redisClient,
      PwdRedisClient: PwdRedisClient,
    }),
  });

  apollo.applyMiddleware({ app, cors: false });

  app.use(helmet());
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.get("/", (_, res) => {
    return __PROD__
      ? res.send("<b>Hello THERE</b>")
      : res.send("<b>CONSTRUCTION GOING ON...</b>");
  });

  app.get("/confirm-email/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const userID = await redisClient.get(id);
    redisClient.del(id);
    if (!userID) res.send("HOW ARE YOU HERE < LOL ?");
    else {
      User.update({ userID }, { isVerified: true });
      res.send(verifiedPageTemplate());
    }
  });

  app.listen(__PORT__, () => {
    console.log("Server has been initialized in port", __PORT__);
  });
};

main().catch((e) => console.log(e));
