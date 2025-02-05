import ky from 'ky';
import { AuthStore, handleToken } from '@/utils/authService';

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
    beforeRequest: [
      (request) => {
        const token = AuthStore.getAccessToken();
        const isAuthRequest = request.url.includes('/auth/signin'); // 로그인 요청인지 확인

        // 헤더에 accessToken 담기
        if (token && !isAuthRequest) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [handleToken],
  },
});

export default api;
