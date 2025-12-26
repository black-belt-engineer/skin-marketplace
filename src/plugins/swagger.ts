import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export const swaggerPlugin = fp(async (server: FastifyInstance) => {
    await server.register(swagger, {
        openapi: {
            info: {
                title: 'Skin Marketplace API',
                description: 'API for Skin Marketplace',
                version: '1.0.0',
            },
        },
    });

    await server.register(swaggerUi, {
        routePrefix: '/documentation',
    });
});
