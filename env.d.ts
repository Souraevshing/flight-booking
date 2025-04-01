declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: 'development' | 'production';
    PORT: string;

    JWT_SECRET: string;
    CSRF_SECRET: string;

    THROTTLE_TTL: string;
    THROTTLE_LIMIT: string;

    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_SYNC: boolean;
  };
}
