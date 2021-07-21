import "reflect-metadata";
require("dotenv").config();
import Express from "express";
import {
  COOKIE_NAME,
  COOKIE_SECRET,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  __PORT__,
  __PROD__,
} from "./constants";
import morgan from "morgan";
import { createConnection } from "typeorm";
import { User } from "./models/user";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/User";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import "dotenv/config";
import session from "express-session";
import { ApolloContext } from "./types";
import cors from "cors";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = Express();
  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );
  const redisClient = new Redis();
  const redisStore = connectRedis(session);
  console.log(COOKIE_SECRET);
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
        // secure: "auto",
        sameSite: "lax",
      },
    })
  );

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): ApolloContext => ({ req, res }),
  });
  await apollo.start();
  apollo.applyMiddleware({ app, cors: false });

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.get("/", (_, res) => {
    return __PROD__
      ? res.send("<b>Hello THERE</b>")
      : res.send("<b>CONSTRUCTION GOING ON...</b>");
  });

  app.listen(__PORT__, () => {
    console.log("Server has been initialized in port", __PORT__);
  });
};

main().catch((e) => console.log(e));
