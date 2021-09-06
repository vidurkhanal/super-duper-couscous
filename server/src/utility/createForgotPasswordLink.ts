import { Redis } from "ioredis";
import { v4 } from "uuid";
import { CLIENT_URL } from "./../constants";

export const createForgetPasswordLink = async (
  redisClient: Redis,
  userID: string,
  variant: "reset" | "unfreeze"
): Promise<string> => {
  const id = v4();
  await redisClient.set(id, userID, "ex", 60 * 10);
  return `${CLIENT_URL}/resetpassword?token=${id}?variant=${variant}"`;
};
