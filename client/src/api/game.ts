import { useMutation, useQuery } from '@tanstack/react-query';
import api from './instance';
import { WinningRate } from '@/types/chart';
import { Card, Player, RoomStatus } from '@/types/game';

interface PostCreateGameResponse extends Player {
  roomId: string;
  roomStatus: RoomStatus;
  player1P: Player;
}

interface StompJoinGameResponse extends Player {
  roomId: string;
  player1P: Player;
  player2P: Player;
}

const getWinningRate = async () => {
  const response = await api.get<WinningRate>('game/me/winning-rate');
  const data = await response.json();

  return data;
};

export const useGetWinningRate = () =>
  useQuery({
    queryKey: ['winningRate'],
    queryFn: () => getWinningRate(),
  });

const postCreateGame = async (memberId: string) => {
  const response = await api.post<PostCreateGameResponse>('game/room', { json: { memberId } });
  const data = await response.json();
  return data;
};

export const usePostCreateGame = () => {
  // const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (memberId: string) => postCreateGame(memberId),
    onSuccess: () => {},
  });

  return mutateAsync;
};

const getProblem = async () => {
  const response = await api.get<Card[]>('game/problems?limit=15');
  const data = await response.json();
  return data;
};

export const useGetProblem = (roomStatus: RoomStatus) =>
  useQuery({
    queryKey: ['problems'],
    queryFn: () => getProblem(),
    enabled: roomStatus === 'READY',
  });
