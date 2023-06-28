import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

const dataMock = {
  id: 1,
  title: 'post',
  body: 'content',
};
const providedUrlMock = '/posts/1';
const baseUrlMock = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn(async () => ({}));
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    await throttledGetDataFromApi(providedUrlMock);
    jest.runAllTimers();
    expect(mockedAxios.create).toBeCalledWith({
      baseURL: baseUrlMock,
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn(async () => ({}));
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    await throttledGetDataFromApi(providedUrlMock);
    jest.runAllTimers();
    expect(getMock).toBeCalledWith(providedUrlMock);
  });

  test('should return response data', async () => {
    const getMock = jest.fn(async () => ({ data: dataMock }));
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    const data = await throttledGetDataFromApi(providedUrlMock);
    expect(data).toBe(dataMock);
  });
});
