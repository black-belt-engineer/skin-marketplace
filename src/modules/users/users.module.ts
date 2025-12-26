import { FastifyInstance, FastifySchema } from 'fastify';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

export const deductBalanceSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['userId', 'amount'],
        properties: {
            userId: { type: 'integer' },
            amount: { type: 'number', minimum: 0.01 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                newBalance: { type: 'number' },
            },
        },
    },
};

export async function usersModule(fastify: FastifyInstance) {
    const usersRepository = new UsersRepository(fastify);
    const usersService = new UsersService(usersRepository);
    const usersController = new UsersController(usersService);

    fastify.post(
        '/users/deduct-balance',
        { schema: deductBalanceSchema },
        usersController.deductBalance.bind(usersController)
    );
}
