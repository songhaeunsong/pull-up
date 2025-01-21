import { useQuery } from '@tanstack/react-query';
import api from './instance';
import { Streak } from '@/types/chart';

type GetStreakResponse = Streak[];

const getStreak = () => api.get<GetStreakResponse>('/interview/me/streak');

export const useGetStreak = () =>
  useQuery({
    queryKey: ['streak'],
    queryFn: () => getStreak(),
  });
