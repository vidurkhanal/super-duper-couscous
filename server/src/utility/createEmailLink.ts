import { v4 } from "uuid";
import { Redis } from "ioredis";

export const createEmailLink = async (
  url: string,
  redisClient: Redis,
  userID: string
): Promise<string> => {
  const id = v4();
  await redisClient.set(id, userID, "ex", 60 * 60 * 24);
  return `${url}/confirm-email/${id}`;
};
