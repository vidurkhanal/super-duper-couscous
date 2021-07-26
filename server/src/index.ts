import "reflect-metadata";
require("dotenv").config();
import Express, { Request, Response } from "express";
import {
  COOKIE_NAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
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

const main = async () => {
  await createConnection({
    type: "postgres",
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User, Credential],
  });

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
  const redisClient = new Redis();
  const redisStore = connectRedis(session);

  app.use(
    session({
      secret: "w**oS=l9MBWY=CpRvuwT=uu#BXaVJ45l",
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
    context: ({ req, res }): ApolloContext => ({ req, res, redisClient }),
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
