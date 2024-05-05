import dotenv from 'dotenv';
dotenv.config().parsed;

export const SERVICE_LOCAL_PORT = process.env.SERVICE_LOCAL_PORT
export const CACHING_METHOD = process.env.CACHING_METHOD || 'none'
export const NODE_ENV = process.env.NODE_ENV
export const COMPOSE_PROJECT_NAME = process.env.COMPOSE_PROJECT_NAME
export const REDIS_URL = process.env.REDIS_URL

/**
 * A list for CORS policy
 * Leave empty array to allow from all(*)
 */
export const allowedOrigin = ['http://localhost:8080']