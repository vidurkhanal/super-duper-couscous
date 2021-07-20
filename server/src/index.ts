import "reflect-metadata";
import Express from "express";
import {
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
import "dotenv/config";

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
  // User.delete({});
  const app = Express();
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
  });
  await apollo.start();
  apollo.applyMiddleware({ app });

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

main().catch(e => console.log(e));
