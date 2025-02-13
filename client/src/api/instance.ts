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
  timeout: 10 * 1000,
  retry: {
    limit: 4,
    statusCodes: [401],
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    backoffLimit: 3 * 1000,
    maxRetryAfter: 180_000, // retry-after 헤더의 최대 대기 시간도 설정
  },

  hooks: {
    beforeRequest: [setTokenHeader],
    beforeRetry: [handleRefreshToken],
  },
});

export default api;
