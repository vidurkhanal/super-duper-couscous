import { Redis } from "ioredis";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type ApolloContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userID?: string };
  };
  redisClient: Redis;
  PwdRedisClient: Redis;
  res: Response;
  payload?: { userID: number };
};
