import Header from '@/components/common/header/Header';
import MobileHeader from '@/components/common/header/MobileHeader';
import { cn } from '@/lib/utils';
import { useRoomStore } from '@/stores/roomStore';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

const SM_STYLE = 'mx-auto max-w-[430px]';
const BASIC_STYLE = 'sm:mx-0 sm:max-w-full w-full h-screen';

const GameLayout = () => {
  const { roomId } = useRoomStore();
  const { connectWebSocket, disconnectWebSocket, updateSubscription } = useWebSocketStore();

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      updateSubscription(roomId);
    }
  }, [roomId]);

  return (
    <div className={cn(SM_STYLE, BASIC_STYLE)}>
      <Header />
      <MobileHeader />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default GameLayout;
