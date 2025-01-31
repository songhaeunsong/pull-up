import { Member } from '@/types/member';
import api from './instance';
import { useQuery } from '@tanstack/react-query';

const getMember = async () => {
  const response = await api.get<Member>('member/me');
  const data = await response.json();
  return data;
};

export const useGetMemberInfo = () =>
  useQuery({
    queryKey: ['member'],
    queryFn: () => getMember(),
  });
