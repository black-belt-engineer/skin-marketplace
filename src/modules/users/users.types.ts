export interface UserRow {
    id: number;
    balance: string;
}

export enum DeductBalanceStatus {
    SUCCESS = 'success',
    USER_NOT_FOUND = 'user_not_found',
    INSUFFICIENT_FUNDS = 'insufficient_funds',
}

export type DeductBalanceResult =
    | { status: DeductBalanceStatus.SUCCESS; newBalance: number }
    | { status: DeductBalanceStatus.USER_NOT_FOUND }
    | { status: DeductBalanceStatus.INSUFFICIENT_FUNDS };
