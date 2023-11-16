import axios from 'axios';

import { PokeType, PokeInfoType } from '@utils/poke';

const d2rApi = axios.create({
  baseURL: '/api/v1/poke',
  timeout: 12000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

interface ApiResponse<T> {
  items: T[];
  count: number;
  next: string | null;
}

export const getPokeList = async (offset: number, limit: number) => {
  return await d2rApi.get<ApiResponse<PokeType>>(
    `list?offset=${offset}&limit=${limit}`
  );
};

export const getPokeInfo = async (id: string) => {
  return await d2rApi.get<PokeInfoType>(`${id}`);
};
