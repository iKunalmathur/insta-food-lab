import api from '../config/api';
import { T_REQ_METHOD } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function apiRequest(url: string, method: T_REQ_METHOD, data?: any) {
  try {
    const res = await fetch(`${api.baseUrl}${url}`, {
      method,
      headers: {
        // 'Content-Type': 'application/json', // !! DO NOT ENABLE SINCE WE ARE USING FORMDATA
        Accept: 'application/json',
      },
      body: method === 'GET' ? null : data,
    });

    if (!res.ok) {
      throw new Error('failed to complete request');
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
