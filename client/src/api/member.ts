import { Member, Subject } from '@/types/member';
import api from './instance';
import { useMutation, useQuery } from '@tanstack/react-query';
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

// 선호 과목 수정
export const updateInterestSubjects = async (subjects: Subject[]) => {
  const response = await api.patch('member/interest-subject', {
    json: { subjectNames: subjects },
  });
  return response.status;
};

export const useUpdateInterestSubjects = (subjects: Subject[]) => {
  return useMutation({
    mutationFn: () => updateInterestSubjects(subjects),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['member'] });
      const previousData = queryClient.getQueryData<Member | null>(['member']);
      console.log('previousData', previousData);
      if (previousData) {
        queryClient.setQueryData<Member>(['member'], {
          ...previousData,
          interestSubjects: subjects,
        });
      }

      return { previousData };
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        console.log('관심 과목 수정에 실패했습니다.', err);
        queryClient.setQueryData(['member'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};

// 디바이스 토큰 등록
export const registerDeviceToken = async (token: string) => {
  const data = await api.post('member/device-token', { json: { token: token } }).json<number>();
  return data;
};
