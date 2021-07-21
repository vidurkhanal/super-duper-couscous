export const __PORT__ = 8080;
export const __PROD__ = process.env.NODE_ENV === "production";
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME!;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;
export const DATABASE_NAME = process.env.DATABASE_NAME!;
export const COOKIE_NAME = "auth_secret_cjscnjdncn_jdnvndc";
export const COOKIE_SECRET = process.env.SESSION_SECRET!;
