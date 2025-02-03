import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

// 로그인
const login = async () => {
  const data = await api.post('auth/signin').json<AuthResponseType>();
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
