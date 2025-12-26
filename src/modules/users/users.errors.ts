export class InsufficientFundsException extends Error {
    constructor(message: string = 'Insufficient funds') {
        super(message);
        this.name = 'InsufficientFundsException';
    }
}

export class UserNotFoundException extends Error {
    constructor(userId: number) {
        super(`User with id ${userId} not found`);
        this.name = 'UserNotFoundException';
    }
}

