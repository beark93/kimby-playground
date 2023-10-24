import axios from 'axios';

import { UberType } from '@utils/uber';

const d2rApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://diablo2.io/dclone_api.php'
      : '/api',
  timeout: 120000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export async function getUberList() {
  return await d2rApi.get<Array<UberType>>('');
}
