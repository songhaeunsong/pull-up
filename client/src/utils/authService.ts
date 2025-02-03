import { BeforeRequestHook } from 'ky';

export const OAuthLogin = (domain: string): void => {
  if (import.meta.env.VITE_MOCK_SERVICE === 'develop') {
    window.location.href = `/redirect?code=test_code`; // msw
  } else {
    window.location.href = `https://api.pull-up.store/oauth2/authorization/${domain}`;
  }
};

// Header에 accessToken 담기
export const setAuthorizationHeader: BeforeRequestHook = (request) => {
  // 쿠키에서 accessToken 추출
  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='));
    console.log('cookies: ', document.cookie);
    console.log('token: ', tokenCookie);
    if (!tokenCookie) return null;
    return tokenCookie.split('=')[1].trim();
  };

  const accessToken = getAccessTokenFromCookie();
  console.log('accessToken: ', accessToken);

  if (!accessToken) {
    console.log('accessToken 추출 실패');
    return;
  }

  request.headers.set('Authorization', `Bearer ${accessToken}`);
};

// export const handleToken = async (request: Request, response: Response) => {
//   if (response.status == 401) {
//     try {
//       await reissue();
//       return api(request);
//     } catch (error) {
//       console.error('토큰 재발급에 실패했습니다.:', error);
//       window.location.href = '/signin';
//     }
//   }
// };
