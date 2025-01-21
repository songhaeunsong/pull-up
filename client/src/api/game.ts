import { useQuery } from '@tanstack/react-query';
import api from './instance';
import { WinningRate } from '@/types/chart';

const getWinningRate = () => api.get<WinningRate>('/game/me/winning-rate');

export const useGetWinningRate = () =>
  useQuery({
    queryKey: ['winningRate'],
    queryFn: () => getWinningRate(),
  });
