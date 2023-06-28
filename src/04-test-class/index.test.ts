import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1100)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountToTranser = getBankAccount(0);
    expect(() => account.transfer(1100, accountToTranser)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(500).getBalance()).toEqual(initialBalance + 500);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(500).getBalance()).toEqual(initialBalance - 500);
  });

  test('should transfer money', () => {
    const accountToTranser = getBankAccount(0);
    account.transfer(500, accountToTranser);
    expect(account.getBalance()).toEqual(initialBalance - 500);
    expect(accountToTranser.getBalance()).toEqual(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await account.fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalanceResult = 333;
    account.fetchBalance = jest.fn().mockResolvedValueOnce(fetchBalanceResult);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(fetchBalanceResult);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn().mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
