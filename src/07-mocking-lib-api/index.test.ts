// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedData = {
  data: { id: 1, name: 'John Doe' },
};
const baseURL = 'https://jsonplaceholder.typicode.com';
const path = '/guide';

describe('throttledGetDataFromApi', () => {
  const _axios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    _axios.create.mockReturnThis();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    _axios.get.mockResolvedValueOnce(mockedData);
    await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(_axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    _axios.get.mockResolvedValueOnce(mockedData);
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(_axios.create().get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    _axios.get.mockResolvedValueOnce(mockedData);
    expect(await throttledGetDataFromApi(path)).toEqual(mockedData.data);
  });
});
