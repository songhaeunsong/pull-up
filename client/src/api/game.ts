import { useMutation, useQuery } from '@tanstack/react-query';
import api from './instance';
import { WinningRate } from '@/types/chart';
import { SubjectSelect } from '@/types/game';
import {
  GetIdResponse,
  GetRandomTypeResponse,
  PostCreateGameResponse,
  PostJoinGameResponse,
} from '@/types/response/game';

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

const getRandomType = async () => {
  const response = await api.get<GetRandomTypeResponse>('game/random/type');
  const data = await response.json();

  return data;
};

export const useGetRandomType = () =>
  useQuery({
    queryKey: ['randomType'],
    queryFn: () => getRandomType(),
  });

const postCreateRoomRandom = async () => {
  const response = await api.post<PostCreateGameResponse>('game/room/random');
  const data = await response.json();

  return data;
};

export const usePostCreateRoomRandom = () => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postCreateRoomRandom(),
  });
  return mutateAsync;
};
