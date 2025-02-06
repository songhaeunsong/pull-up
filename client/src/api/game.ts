import { useMutation, useQuery } from '@tanstack/react-query';
import api from './instance';
import { WinningRate } from '@/types/chart';
import { Player, RoomStatus, SubjectSelect } from '@/types/game';

interface PostCreateGameResponse extends Player {
  roomId: string;
  roomStatus: RoomStatus;
  player1P: Player;
}

interface PostJoinGameResponse {
  isReady: boolean;
}

interface GetIdResponse {
  playerNumber: 1 | 2;
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

const postCreateGame = async (selects: SubjectSelect) => {
  const response = await api.post<PostCreateGameResponse>('game/room', { json: selects });
  const data = await response.json();
  return data;
};

export const usePostCreateGame = () => {
  // const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (selects: SubjectSelect) => postCreateGame(selects),
    onSuccess: () => {},
  });

  return mutateAsync;
};

const postJoinGame = async (roomId: string) => {
  const response = await api.post<PostJoinGameResponse>('game/room/join', { json: { roomId } });
  const data = await response.json();
  return data;
};

export const usePostJoinGame = () => {
  // const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (roomId: string) => postJoinGame(roomId),
    onSuccess: () => {},
  });

  return mutateAsync;
};

const getId = async (roomId: string) => {
  const response = await api.get<GetIdResponse>(`game/room/${roomId}/player`);
  const data = await response.json();
  return data;
};

export const useGetId = (roomId: string) =>
  useQuery({
    queryKey: ['myId'],
    queryFn: () => getId(roomId),
  });
