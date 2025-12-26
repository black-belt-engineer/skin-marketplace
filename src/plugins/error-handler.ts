import fp from 'fastify-plugin';
import { FastifyInstance, FastifyError } from 'fastify';

export const errorHandlerPlugin = fp(async (app: FastifyInstance) => {
    app.setErrorHandler((error: FastifyError, _request, reply) => {
        const err = error as Error & { name: string };

        const badRequestErrors = ['InsufficientFundsException'];
        if (badRequestErrors.includes(err.name)) {
            return reply.status(400).send({
                statusCode: 400,
                error: 'Bad Request',
                message: err.message,
            });
        }

        if (err.name === 'UserNotFoundException') {
            return reply.status(404).send({
                statusCode: 404,
                error: 'Not Found',
                message: err.message,
            });
        }

        app.log.error(err);
        return reply.send(error);
    });
});
