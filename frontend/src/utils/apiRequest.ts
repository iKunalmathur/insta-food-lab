import { config } from '@/config';
import { T_REQ_METHOD } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function apiRequest(
  url: string,
  method: T_REQ_METHOD,
  data?: any,
  accessToken?: string,
) {
  try {
    const res = await fetch(`${config.api.baseUrl}${url}`, {
      method,
      headers: {
        // 'Content-Type': 'application/json', // !! DO NOT ENABLE SINCE WE ARE USING FORMDATA
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: method === 'GET' ? null : data,
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
