import ky from 'ky';
import { setTokenHeader, handleRefreshToken } from '@/utils/authService';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  retry: 1,
});

const api = instance.extend({
  hooks: {
    beforeRequest: [setTokenHeader],
    beforeRetry: [
      async (options) => {
        console.log('beforeRetry hook 실행됨');
        console.log('retry options:', options);
        await handleRefreshToken(options);
      },
    ],
  },
  retry: {
    limit: 1,
    statusCodes: [401],
  },
});

export default api;
