import Fastify, { FastifyInstance } from 'fastify';
import { swaggerPlugin } from './plugins/swagger';
import { infraPlugin } from './plugins/infra';

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: true,
    });

    await app.register(swaggerPlugin);
    await app.register(infraPlugin);

    return app;
};
