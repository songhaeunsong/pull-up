import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { AuthStore } from '@/utils/authService';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// 로그인
export const login = async () => {
  const response = await api.post('auth/signin');
  const data = await response.json<AuthResponseType>();

  // accessToken 추출
  const accessToken = response.headers.get('Authorization');
  if (accessToken) {
    AuthStore.setAccessToken(accessToken);
  }

  return data;
};

// 토큰 재발급
export const reissue = async () => {
  const response = await api.post('auth/reissue');

  const accessToken = response.headers.get('Authorization');
  if (accessToken) {
    AuthStore.setAccessToken(accessToken);
  }

  await queryClient.invalidateQueries({ queryKey: ['auth'] });
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

export const useSignUpMutation = (subjectNames: Subject[]) => {
  const { mutate } = useMutation({
    mutationFn: () => signup(subjectNames),
    onError: (error) => {
      toast.error('회원가입을 실패했습니다.', {
        position: 'bottom-center',
        toastId: 'member-required',
      });

      throw new Error();
    },
  });

  return mutate;
};
