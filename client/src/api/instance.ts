import ky from 'ky';
import { handleToken } from '@/utils/authService';
import { AuthStore } from '@/stores/authStore';

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
        const isAuthRequest = request.url.includes('/auth/signin');

        // 로그인 요청 후 accessToken 추출
        if (token && !isAuthRequest) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [handleToken],
  },
});

export default api;
