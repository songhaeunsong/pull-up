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
    backoffLimit: 3 * 1000,
  },
  hooks: {
    beforeRequest: [
      (request) => {
        console.log('요청 전:', request.url);
        setTokenHeader(request);
      },
    ],
    beforeRetry: [
      async (options) => {
        console.log('재시도 전:', options);
        await handleRefreshToken(options);
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log('응답 후:', {
          status: response.status,
          url: response.url,
        });
      },
    ],
    beforeError: [
      (error) => {
        console.log('에러 발생:', {
          status: error.response?.status,
          message: error.message,
        });
        return error;
      },
    ],
  },
});

export default api;
