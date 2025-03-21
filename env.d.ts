declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: 'development' | 'production';
    POSTGRES_DB_URI: string;
    JWT_SECRET: string;
    CSRF_SECRET: string;
    PORT: string;
    THROTTLE_TTL: string;
    THROTTLE_LIMIT: string;
  };
}
