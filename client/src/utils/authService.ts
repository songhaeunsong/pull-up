import { DomainType } from '@/types/auth';
import { BeforeRequestHook } from 'ky';

const { VITE_BASE_URI } = import.meta.env;

export const OAuthLogin = (domain: DomainType) => {
  window.location.href = `${VITE_BASE_URI}/oauth2/authoriaztion/${domain}`;
};

// Header에 accessToken 담기
export const setAuthorizationHeader: BeforeRequestHook = (request) => {
  // 쿠키에서 accessToken 추출
  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='));
    if (!tokenCookie) return null;
    return tokenCookie.split('=')[1].trim();
  };

  const accessToken = getAccessTokenFromCookie();

  if (!accessToken) {
    console.log('accessToken 추출 실패');
    return;
  }

  request.headers.set('Authorization', `Bearer ${accessToken}`);
};
