import path from "path";
import { DataSource } from "typeorm";
import { Credential } from "./models/credential";
import { User } from "./models/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User, Credential],
  synchronize: false,
});
