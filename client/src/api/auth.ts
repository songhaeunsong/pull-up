import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

const login = () => {
  const data = api.post('/auth/signin').json<AuthResponseType>();
  return data;
};

export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: login,
  });
};

export const logout = async () => {
  return await api.post('/auth/logout');
};

export const signup = async (interestSubjects: Subject[]) => {
  return await api.post('/auth/signup', { json: { interestSubjects } });
};
