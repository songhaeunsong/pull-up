import ky from 'ky';
import { setTokenHeader, handleRefreshToken } from '@/utils/authService';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
});

const api = instance.extend({
  retry: {
    limit: 4,
    backoffLimit: 3 * 1000,
  },
  hooks: {
    beforeRequest: [setTokenHeader],
    beforeRetry: [handleRefreshToken],
  },
});

export default api;
