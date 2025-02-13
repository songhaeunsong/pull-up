import { reissue } from '@/api/auth';
import api from '@/api/instance';
import { AfterResponseHook } from 'ky';

const AUTH_TOKEN_KEY = 'auth_access_token';

export const AuthStore = (() => {
  return {
    getAccessToken: (): string | null => {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    setAccessToken: (token: string) => {
      if (!token) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return;
      }

      const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    },

    clearAccessToken: () => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  };
})();

// 헤더에 토큰 주입
export const setTokenHeader = (request: Request) => {
  const token = AuthStore.getAccessToken();
  const isLogin = request.url.includes('/auth/signin'); // 로그인은 헤더에 토큰 주입 안함

  if (token && !isLogin) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

// 토큰 재발급
export const handleRefreshToken: AfterResponseHook = async (request: Request, _, response: Response) => {
  if (response.status === 401 && response.statusText === '[ACCESS_TOKEN] 만료된 Token 입니다.') {
    console.log('토큰 만료');
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
