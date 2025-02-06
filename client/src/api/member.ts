import { Member } from '@/types/member';
import api from './instance';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/main';

const getMember = async () => {
  const response = await api.get<Member>('member/me');
  const data = await response.json();
  return data;
};

export const useGetMemberInfo = () => {
  return {
    ...useQuery({
      queryKey: ['member'],
      queryFn: () => getMember(),
      enabled: false,
    }),
    refetch: () => queryClient.fetchQuery<Member>({ queryKey: ['member'] }),
  };
};
