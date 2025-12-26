import Fastify, { FastifyInstance } from 'fastify';
import { swaggerPlugin } from './plugins/swagger';
import { infraPlugin } from './plugins/infra';
import { itemsModule } from './modules/items/items.module';
import { usersModule } from './modules/users/users.module';

import { errorHandlerPlugin } from './plugins/error-handler';

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: true,
    });

    await app.register(errorHandlerPlugin);
    await app.register(swaggerPlugin);
    await app.register(infraPlugin);
    await app.register(itemsModule);
    await app.register(usersModule);

    return app;
};


