import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { useQuery } from '@tanstack/react-query';
import { AuthStore } from '@/utils/authService';
import { registerServiceWorker, requestPermission } from '@/serviceWorker';

// 로그인
const login = async () => {
  const response = await api.post('auth/signin');
  const data = await response.json<AuthResponseType>();

  // accessToken 추출
  const accessToken = response.headers.get('Authorization');
  if (accessToken) {
    AuthStore.setAccessToken(accessToken);
  }

  return data;
};

export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: login,
  });
};

// 토큰 재발급
export const reissue = async () => {
  try {
    const { accessToken } = await api.post('auth/reissue').json<{ accessToken: string }>();
    AuthStore.setAccessToken(accessToken);
  } catch (error) {
    console.error('토큰 재발급 실패: ', error);
  }
};

// 로그아웃
export const logout = async () => {
  return await api.post('auth/logout');
};

// 회원가입
export const signup = async (interestSubjects: Subject[]) => {
  try {
    const response = await api.post('auth/signup', {
      json: { interestSubjects },
    });

    // 회원가입 성공 시 알림 설정
    try {
      await registerServiceWorker();
      await requestPermission();
    } catch (error) {
      console.error('푸시 알림 설정 실패:', error);
    }

    return response;
  } catch (error) {
    console.error('회원가입 실패:', error);
  }
};
