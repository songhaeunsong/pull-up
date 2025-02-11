import { useEffect } from 'react';
import GameContainer from './gameContainer/GameContainer';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useRoomStore } from '@/stores/roomStore';

const GamePage = () => {
  const { roomId } = useRoomStore();
  const { updateSubscription } = useWebSocketStore();

  useEffect(() => {
    updateSubscription(roomId, 'status');
  }, [roomId]);

  return (
    <div className="h-full w-full bg-white">
      <GameContainer />
    </div>
  );
};

export default GamePage;
