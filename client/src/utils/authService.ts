import { reissue } from '@/api/auth';
import api from '@/api/instance';
import { BeforeRequestHook } from 'ky';

export const OAuthLogin = (domain: string): void => {
  if (import.meta.env.VITE_MOCK_SERVICE === 'develop') {
    window.location.href = `/redirect`; // msw
  } else {
    window.location.href = `https://api.pull-up.store/oauth2/authorization/${domain}`;
  }
};

// Header에 accessToken 담기
export const setAuthorizationHeader: BeforeRequestHook = (response) => {
  // accessToken 추출
  const accessToken = response.headers.get('Authorization');
  console.log('accessToken: ', accessToken);

  if (!accessToken) {
    console.log('accessToken 추출 실패');
    return;
  }

  response.headers.set('Authorization', `Bearer ${accessToken}`);
};

export const handleToken = async (request: Request, response: Response) => {
  const url = new URL(request.url);
  const retryCount = Number(url.searchParams.get('-retry') || 0);

  if (response.status == 401) {
    if (retryCount > 2) {
      console.error('토근 재발급 횟수가 2회 초과되었습니다.');
      window.location.href = '/signin';
      return;
    }
    try {
      await reissue();
      url.searchParams.set('_retry', String(retryCount + 1));
      return api(new Request(url.toString(), request));
    } catch (error) {
      console.error('토큰 재발급에 실패했습니다.:', error);
      window.location.href = '/signin';
    }
  }
};
