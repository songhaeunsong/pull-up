import { reissue } from '@/api/auth';
import api from '@/api/instance';
import { AuthStore } from '@/stores/authStore';
import { AfterResponseHook } from 'ky';

export const OAuthLogin = (domain: string): void => {
  if (import.meta.env.VITE_MOCK_SERVICE === 'develop') {
    window.location.href = `/redirect`; // msw
  } else {
    window.location.href = `${import.meta.env.VITE_OAUTH_URL}/oauth2/authorization/${domain}`;
  }
};

export const handleToken: AfterResponseHook = async (request: Request, _, response: Response) => {
  if (response.status == 401) {
    try {
      // 토큰 재발급
      await reissue();

      // 기존 api 재요청
      const newRequest = new Request(request, {
        headers: {
          ...request.headers,
          Authorization: `Bearer ${AuthStore.getAccessToken()}`,
        },
      });

      return api(newRequest);
    } catch (error) {
      console.error('토큰 재발급에 실패:', error);
      window.location.href = '/signin';
    }
  }
};
