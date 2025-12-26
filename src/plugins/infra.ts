import fp from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';
import fastifyRedis from '@fastify/redis';
import { FastifyInstance } from 'fastify';

export default fp(async (server: FastifyInstance) => {
    await server.register(fastifyPostgres, {
        connectionString: `postgres://${server.config.POSTGRES_USER}:${server.config.POSTGRES_PASSWORD}@${server.config.POSTGRES_HOST}:${server.config.POSTGRES_PORT}/${server.config.POSTGRES_DB}`,
    });

    await server.register(fastifyRedis, {
        host: server.config.REDIS_HOST,
        port: server.config.REDIS_PORT,
    });
});
