import axios from 'axios';

import { UberType } from '@utils/uber';

const d2rApi = axios.create({
  baseURL: '/api/v1/uber/list',
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

interface ApiResponse<T> {
  items: T[];
  count: number;
}

export async function getUberList() {
  return await d2rApi.get<ApiResponse<UberType>>('');
}
