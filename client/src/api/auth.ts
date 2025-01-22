import { AuthResponseType } from '@/types/auth';
import api from './instance';
import { Subject } from '@/types/member';

export const login = () => {
  const data = api.post('/auth/signin').json<AuthResponseType>();
  return data;
};

export const logout = api.post('/auth/logout');

export const signup = (interestSubjects: Subject[]) => {
  return api.post('/auth/signup', { json: { interestSubjects } });
};
