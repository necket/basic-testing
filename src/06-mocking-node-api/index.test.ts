import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);

    expect(setTimeoutMock).toHaveBeenCalledWith(callback, timeout);
    setTimeoutMock.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
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
    const setIntervalMock = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);

    expect(setIntervalMock).toHaveBeenCalledWith(callback, timeout);
    setIntervalMock.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout * 5);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'some.txt';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinMock).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContentMock = 'File content!';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContentMock);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toEqual(fileContentMock);
  });
});
