// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const timeoutDuration = 500;
    const testCallback = jest.fn();
    doStuffByTimeout(testCallback, timeoutDuration);
    expect(mockSetTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      timeoutDuration,
    );
    expect(mockSetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const testCallback = jest.fn();
    const timeoutDuration = 500;
    doStuffByTimeout(testCallback, timeoutDuration);
    expect(testCallback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(testCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval');
    const intervalDuration = 500;
    const testCallback = jest.fn();
    doStuffByInterval(testCallback, intervalDuration);
    expect(mockSetInterval).toHaveBeenCalledTimes(1);
    expect(testCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(intervalDuration);
    expect(testCallback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalDuration = 500;
    const repeats = 4;
    const testCallback = jest.fn();
    doStuffByInterval(testCallback, intervalDuration);
    jest.advanceTimersByTime(intervalDuration * repeats);
    expect(testCallback).toHaveBeenCalledTimes(repeats);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'example.txt';
    jest.spyOn(path, 'join').mockImplementation(() => `mocked/path/${filePath}`);
    await readFileAsynchronously(filePath);
    expect(path.join).toHaveBeenCalledWith(expect.any(String), filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('nonexistent.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Sample text';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    const result = await readFileAsynchronously('existent.txt');
    expect(result).toBe(fileContent);
  });
});
