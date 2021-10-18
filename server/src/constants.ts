export const __PORT__ = process.env.PORT;
export const __PROD__ = process.env.NODE_ENV === "production";
export const DATABASE_URL = process.env.DATABASE_URL;
export const COOKIE_NAME = "auth_secret_cjscnjdncn_jdnvndc";
export const COOKIE_SECRET = process.env.SESSION_SECRET;
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const SERVER_URL = __PROD__
  ? "https://api.kpass12.ninja"
  : "http://localhost:8080";
export const COMPANY_NAME = "K Pass 12";
export const VERIFY_EMAIL_PREFIX = "verifyEmail:";
export const CLIENT_URL = __PROD__
  ? "https://kpass12.ninja"
  : "http://localhost:3000";
export const PWD_REDIS_CLIENT_HOST = process.env.PWD_REDIS_CLIENT_HOST;
export const PWD_REDIS_PASSWORD = process.env.PWD_REDIS_PASSWORD;
export const SEND_IN_BLUE_EMAIL_FOR_VERIFY =
  process.env.SEND_IN_BLUE_EMAIL_FOR_VERIFY;
export const SEND_IN_BLUE_PASSWORD_FOR_VERIFY =
  process.env.SEND_IN_BLUE_PASSWORD_FOR_VERIFY;
export const SESSIONS_REDIS_CLIENT_HOST =
  process.env.SESSIONS_REDIS_CLIENT_HOST;
export const SESSIONS_REDIS_PASSWORD = process.env.SESSIONS_REDIS_PASSWORD;
export const ICON_FETCHER =
  "https://grab-favicons.herokuapp.com/api/v1/grab-favicons?url=";
export const ALLOWED_LOGIN_ATTEMPTS = 6;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
