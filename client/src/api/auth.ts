import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { useQuery } from '@tanstack/react-query';
import { AuthStore } from '@/utils/authService';
import { queryClient } from '@/main';

const login = async () => {
  try {
    console.log('로그인 요청 시작');
    const response = await api.post('auth/signin');
    console.log('서버 응답:', response);

    const data = await response.json<AuthResponseType>();
    console.log('파싱된 데이터:', data);

    const accessToken = response.headers.get('Authorization');
    console.log('추출된 토큰:', accessToken);

    if (accessToken) {
      AuthStore.setAccessToken(accessToken);
    }

    return data;
  } catch (error) {
    console.error('로그인 중 에러 발생:', error);
    throw error; // useQuery가 에러를 감지할 수 있도록 다시 throw
  }
};

export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: login,
    retry: false, // 실패시 재시도하지 않도록 설정
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
  await api.post('auth/logout');
  queryClient.setQueryData(['member'], null);
};

// 회원가입
export const signup = async (subjectNames: Subject[]) => {
  return await api.post('auth/signup', { json: { subjectNames } });
};
