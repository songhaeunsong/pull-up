import { reissue } from '@/api/auth';
import api from '@/api/instance';
import { AfterResponseHook } from 'ky';

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

// 헤더에 토큰 주입
export const addAuthHeader = (request: Request) => {
  const token = AuthStore.getAccessToken();
  const isLogin = request.url.includes('/auth/signin'); // 로그인은 헤더에 토큰 주입 안함
  console.log('헤더에 토큰 주입:', token, isLogin);

  if (token && !isLogin) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

// 토큰 재발급
export const handleToken: AfterResponseHook = async (request: Request, _, response: Response) => {
  if (response.status === 401 && response.statusText === '[ACCESS_TOKEN] 토큰이 만료되었습니다.') {
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
