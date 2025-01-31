import { Member } from '@/types/member';
import api from './instance';
import { useQuery } from '@tanstack/react-query';

const getMember = () => api.get<Member>('/member/me');

export const useGetMemberInfo = () =>
  useQuery({
    queryKey: ['member'],
    queryFn: () => getMember(),
  });
