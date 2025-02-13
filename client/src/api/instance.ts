import ky from 'ky';
import { setTokenHeader, handleRefreshToken } from '@/utils/authService';
import { API_RETRY_COUNT } from '@/constants/auth';

interface ErrorResponse {
  status: number;
  errorMessage: string;
}

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
    limit: API_RETRY_COUNT,
    statusCodes: [401],
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    backoffLimit: 3 * 1000,
  },

  hooks: {
    beforeRequest: [setTokenHeader],
    beforeRetry: [handleRefreshToken],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const errorData = (await response.json().catch(() => null)) as ErrorResponse | null;

          if (errorData) {
            const errorCode = response.status;
            const errorMessage = errorData.errorMessage || 'Unknown error';

            throw { code: errorCode, message: errorMessage };
          }
        }

        return response;
      },
    ],
  },
});

export default api;
