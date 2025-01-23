import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

// 로그인
const login = async () => {
  const code = new URLSearchParams(window.location.search).get('code');
  if (!code) throw new Error('OAuth 코드가 발급되지 않았습니다.');

  const data = await api
    .post('auth/signin', {
      json: { code },
    })
    .json<AuthResponseType>();
  return data;
};

export const useAuthInfo = () => {
  const code = new URLSearchParams(window.location.search).get('code');

  return useQuery({
    queryKey: ['auth', code],
    queryFn: login,
  });
};

// 토큰 재발급
export const reissue = async () => {
  return await api.post('auth/reissue');
};

// 로그아웃
export const logout = async () => {
  return await api.post('auth/logout');
};

// 회원가입
export const signup = async (interestSubjects: Subject[]) => {
  return await api.post('auth/signup', { json: { interestSubjects } });
};
