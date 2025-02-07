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
    }),
    refetch: () => queryClient.fetchQuery<Member>({ queryKey: ['member'] }),
  };
};

// 디바이스 토큰 등록
export const registerDeviceToken = async (token: string) => {
  const data = await api.post('member/device-token', { json: { token: token } }).json<number>;
  return data;
};
