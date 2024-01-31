import dotenv from 'dotenv';
dotenv.config().parsed;

export const SERVICE_LOCAL_PORT = process.env.SERVICE_LOCAL_PORT
export const NODE_ENV = process.env.NODE_ENV
export const COMPOSE_PROJECT_NAME = process.env.COMPOSE_PROJECT_NAME
export const REDIS_URL = process.env.REDIS_URL