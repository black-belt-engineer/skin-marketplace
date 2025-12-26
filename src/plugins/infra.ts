import fp from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';
import fastifyRedis from '@fastify/redis';
import { FastifyInstance } from 'fastify';
import {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    REDIS_HOST,
    REDIS_PORT,
} from '../config/app-config';

export const infraPlugin = fp(async (server: FastifyInstance) => {
    await server.register(fastifyPostgres, {
        connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
    });

    await server.register(fastifyRedis, {
        host: REDIS_HOST,
        port: REDIS_PORT,
    });
});
