// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  let account: BankAccount;
  let targetAccount: BankAccount;

  beforeEach(() => {
    account = new BankAccount(1000);
    targetAccount = new BankAccount(500);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(1000);
  });

  test('should deposit money', () => {
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should transfer money', () => {
    account.transfer(300, targetAccount);
    expect(account.getBalance()).toBe(700);
    expect(targetAccount.getBalance()).toBe(800);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(2000, targetAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    BankAccount.prototype.fetchBalance = jest.fn().mockResolvedValue(50);
    const account = new BankAccount(1000);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    await account.synchronizeBalance();
    expect(account.getBalance()).not.toBeNull();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
