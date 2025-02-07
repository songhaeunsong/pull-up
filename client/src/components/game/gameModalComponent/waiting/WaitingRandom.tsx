import { useGetRandomType } from '@/api/game';
import Waiting from './Waiting';
import { GetRandomTypeResponse } from '@/types/response/game';
import { useEffect } from 'react';

interface WaitingRandomProps {
  handleGameState: (data: GetRandomTypeResponse) => void;
}

const WaitingRamdom = ({ handleGameState }: WaitingRandomProps) => {
  const { data: roomTypeData, isPending, isError } = useGetRandomType();

  useEffect(() => {
    if (isPending || isError) return;
    handleGameState(roomTypeData);
  }, [roomTypeData]);

  return <Waiting text="함께 게임할 친구를 찾고 있어요!" />;
};

export default WaitingRamdom;
