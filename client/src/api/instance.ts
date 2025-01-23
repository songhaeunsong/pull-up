import ky from 'ky';
import { handleToken } from '@/utils/authService';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_API,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
});

const api = instance.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        console.log('beforeRequest'); // hook 등록 확인
        return request;
      },
    ], // setAuthorizationHeader
    afterResponse: [
      async (_request, _options, response) => {
        await handleToken(_request, response);
      },
      (_request, _options, response) => {
        if (response.ok) return response;
        throw new Error('Response is not OK');
      },
    ],
  },
});

export default api;
