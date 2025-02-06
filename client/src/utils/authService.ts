import { reissue } from '@/api/auth';
import api from '@/api/instance';
import { AfterResponseHook } from 'ky';

// OAuth 로그인
export const OAuthLogin = (domain: string): void => {
  if (import.meta.env.VITE_MOCK_SERVICE === 'develop') {
    window.location.href = `/redirect`; // msw
  } else {
    window.location.href = `${import.meta.env.VITE_OAUTH_URL}/oauth2/authorization/${domain}`;
  }
};

// accessToken 관리
export const AuthStore = (() => {
  let accessToken: string | null;

  return {
    getAccessToken: () => accessToken,
    setAccessToken: (token: string) => {
      if (token?.startsWith('Bearer ')) {
        accessToken = token.slice(7);
      } else {
        accessToken = token;
      }
    },
    clearAccessToken: () => {
      accessToken = null;
    },
  };
})();

// 토큰 재발급
export const handleToken: AfterResponseHook = async (request: Request, _, response: Response) => {
  if (response.status == 401) {
    try {
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
