import { reissue } from '@/api/auth';
import { BeforeErrorHook, HTTPError } from 'ky';

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
export const handleRefreshToken: BeforeErrorHook = async (error: HTTPError) => {
  const { response } = error;
  const responseData = await response.json();

  // 재요청 횟수
  const retryCount = Number(error.request.headers.get('x-retry-count')) || 0;

  if (
    response.status === 401 &&
    responseData.errorMessage === '[ACCESS_TOKEN] 만료된 Token 입니다.' &&
    retryCount < 1
  ) {
    console.log('토큰 만료');
    try {
      await reissue();

      // 새로운 요청 생성 대신 기존 error.request를 재사용
      error.request.headers.set('Authorization', `Bearer ${AuthStore.getAccessToken()}`);
      error.request.headers.set('x-retry-count', String(retryCount + 1));

      // 새로운 에러 객체 생성하여 throw
      throw new HTTPError(error.response, error.request, error.options);
    } catch (refreshError) {
      console.error('토큰 재발급 실패:', refreshError);
      window.location.href = '/signin';
      throw error;
    }
  }

  throw error;
};
