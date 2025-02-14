import { getMember } from '@/api/member';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMember = () => {
  const { data, isError } = useSuspenseQuery({
    queryKey: ['member'],
    queryFn: getMember,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: false,
  });

  return {
    memberInfo: data,
    isError,
  };
};
