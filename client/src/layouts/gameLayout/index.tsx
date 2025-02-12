import Header from '@/components/common/header/Header';
import MobileHeader from '@/components/common/header/MobileHeader';
import { cn } from '@/lib/utils';
import { memberStore } from '@/stores/memberStore';
import { useRoomStore } from '@/stores/roomStore';
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SM_STYLE = 'mx-auto max-w-[430px]';
const BASIC_STYLE = 'sm:mx-0 sm:max-w-full w-full h-screen';

const GameLayout = () => {
  const { roomId } = useRoomStore();
  const { connectWebSocket, disconnectWebSocket, updateSubscription } = useWebSocketStore();
  const { isLoggedIn } = memberStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.', { position: 'bottom-center' });
      navigate('/signin');
      return;
    }

    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [isLoggedIn]);

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
