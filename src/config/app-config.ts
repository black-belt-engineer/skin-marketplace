import 'dotenv/config';

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const HOST = process.env.HOST || '0.0.0.0';
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const POSTGRES_DB = process.env.POSTGRES_DB || '';
export const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
export const POSTGRES_PORT = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432;
export const REDIS_HOST = process.env.REDIS_HOST || '';
export const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
export const SKINPORT_BASE_URL = process.env.SKINPORT_BASE_URL || '';
