import { FastifyInstance } from 'fastify';
import {
    UserRow,
    DeductBalanceStatus,
    DeductBalanceResult
} from './users.types';

export class UsersRepository {
    constructor(private readonly fastify: FastifyInstance) { }

    async deductUserBalance(userId: number, amount: number): Promise<DeductBalanceResult> {
        return this.fastify.pg.transact(async (client) => {
            const { rows } = await client.query<UserRow>(
                'SELECT id, balance FROM users WHERE id = $1 FOR UPDATE',
                [userId]
            );

            const user = rows[0];
            if (!user) {
                return { status: DeductBalanceStatus.USER_NOT_FOUND };
            }

            const currentBalance = parseFloat(user.balance);
            if (currentBalance < amount) {
                return { status: DeductBalanceStatus.INSUFFICIENT_FUNDS };
            }

            const { rows: updateRows } = await client.query<UserRow>(
                'UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance',
                [amount, userId]
            );

            return {
                status: DeductBalanceStatus.SUCCESS,
                newBalance: parseFloat(updateRows[0].balance)
            };
        });
    }
}
