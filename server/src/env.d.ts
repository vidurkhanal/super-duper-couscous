declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    PUBLIC_KEY: string;
    PRIVATE_KEY: string;
    ENCRYPTION_KEY: string;
    SEND_IN_BLUE_EMAIL_FOR_VERIFY: string;
    SEND_IN_BLUE_PASSWORD_FOR_VERIFY: string;
    PWD_REDIS_CLIENT_HOST: string;
    PWD_REDIS_PASSWORD: string;
    SESSIONS_REDIS_CLIENT_HOST: string;
    SESSIONS_REDIS_PASSWORD: string;
    COOKIE_NAME: string;
  }
}