import { v4 } from "uuid";
import { Redis } from "ioredis";
import { FORGOT_PASSWORD_PREFIX } from "./../constants";

export const createForgetPasswordLink = async (
  url: string,
  redisClient: Redis,
  userID: string
): Promise<string> => {
  const id = v4();
  await redisClient.set(
    `${FORGOT_PASSWORD_PREFIX}${id}`,
    userID,
    "ex",
    60 * 10
  );
  return `${url}/confirm-email/${FORGOT_PASSWORD_PREFIX}${id}`;
};
