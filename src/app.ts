import Fastify, { FastifyInstance } from 'fastify';
import configPlugin from './plugins/config';
import infraPlugin from './plugins/infra';

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: true,
    });

    await app.register(configPlugin);
    await app.register(infraPlugin);

    return app;
};
