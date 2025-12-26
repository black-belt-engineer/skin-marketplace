import Fastify, { FastifyInstance } from 'fastify';
import { swaggerPlugin } from './plugins/swagger';
import { infraPlugin } from './plugins/infra';
import { itemsModule } from './modules/items/items.module';

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: true,
    });

    await app.register(swaggerPlugin);
    await app.register(infraPlugin);
    await app.register(itemsModule);

    return app;
};
