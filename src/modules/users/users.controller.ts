import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersService } from './users.service';

interface DeductBalanceBody {
    userId: number;
    amount: number;
}

export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    async deductBalance(
        request: FastifyRequest<{ Body: DeductBalanceBody }>,
        reply: FastifyReply
    ) {
        const { userId, amount } = request.body;

        const result = await this.usersService.deductBalance(userId, amount);
        return reply.send(result);
    }
}
