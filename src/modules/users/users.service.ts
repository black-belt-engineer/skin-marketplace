import { UsersRepository } from './users.repository';
import { DeductBalanceStatus } from './users.types';
import { UserNotFoundException, InsufficientFundsException } from './users.errors';

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async deductBalance(userId: number, amount: number): Promise<{ newBalance: number }> {
        const result = await this.usersRepository.deductUserBalance(userId, amount);

        switch (result.status) {
            case DeductBalanceStatus.SUCCESS:
                return { newBalance: result.newBalance };
            case DeductBalanceStatus.USER_NOT_FOUND:
                throw new UserNotFoundException(userId);
            case DeductBalanceStatus.INSUFFICIENT_FUNDS:
                throw new InsufficientFundsException();
            default:
                throw new Error('Unexpected repository result');
        }
    }
}
