import { Redis } from "ioredis";
import { v4 } from "uuid";

export const createOTP = async (
  redisClient: Redis,
  userID: string
): Promise<string> => {
  const id = v4();
  await redisClient.set(id, userID, "ex", 60 * 10);
  return id;
};
