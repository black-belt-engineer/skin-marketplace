import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';

const schema = {
    type: 'object',
    required: [
        'PORT',
        'HOST',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DB',
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'REDIS_HOST',
        'REDIS_PORT',
    ],
    properties: {
        PORT: {
            type: 'integer',
            default: 3000,
        },
        HOST: {
            type: 'string',
            default: '0.0.0.0',
        },
        POSTGRES_USER: {
            type: 'string',
        },
        POSTGRES_PASSWORD: {
            type: 'string',
        },
        POSTGRES_DB: {
            type: 'string',
        },
        POSTGRES_HOST: {
            type: 'string',
        },
        POSTGRES_PORT: {
            type: 'integer',
            default: 5432,
        },
        REDIS_HOST: {
            type: 'string',
        },
        REDIS_PORT: {
            type: 'integer',
            default: 6379,
        },
    },
};

const configOptions = {
    confKey: 'config',
    schema: schema,
    dotenv: true,
    data: process.env,
};

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: number;
            HOST: string;
            POSTGRES_USER: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DB: string;
            POSTGRES_HOST: string;
            POSTGRES_PORT: number;
            REDIS_HOST: string;
            REDIS_PORT: number;
        };
    }
}

export default fp(async (server: FastifyInstance) => {
    await server.register(fastifyEnv, configOptions);
});
