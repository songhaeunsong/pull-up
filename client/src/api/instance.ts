import { setAuthorizationHeader } from '@/utils/authService';
import ky from 'ky';

const instance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
});

const api = instance.extend({
  hooks: {
    beforeRequest: [setAuthorizationHeader], // accessToken 넣기
    afterResponse: [
      (_request, _options, response) => {
        if (response.status == 403) {
          console.log('reissue');
        }
      },
      (_request, _options, response) => {
        if (response.ok) return response.json();
        throw new Error('Response is not OK');
      },
    ],
  },
});

export default api;
