import { useEffect, useRef, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { Client, StompSubscription } from '@stomp/stompjs';
import { RoomStatus, StompRoomInfo } from '@/types/game';
import { useRoomStore } from '@/stores/roomStore';

const useWebSocket = () => {
  const client = useRef<Client | null>(null);
  const location = useLocation();
  const { roomId, setRoomId } = useRoomStore();

  const [roomStatus, setRoomStatus] = useState<RoomStatus>('WAITING');
  const [roomInfo, setRoomInfo] = useState<StompRoomInfo>({
    roomId: '',
    roomStatus: 'WAITING',
    player1P: { memberId: 0, name: '', score: 0 },
    player2P: { memberId: 0, name: '', score: 0 },
    problemCardWithoutCardIds: [],
  });

  const statusSubscription = useRef<StompSubscription | null>(null);
  const roomSubscription = useRef<StompSubscription | null>(null);

  const isGameWaitingPage = matchPath('/game', location.pathname);
  const isGameStagePage = matchPath('/game/:id', location.pathname);

  useEffect(() => {
    if (!client.current) {
      console.log('Websocket: 새로운 인스턴스 생성');
      client.current = new Client({
        webSocketFactory: () => new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.current.onConnect = () => {
        console.log('WebSocket: 연결 성공');
        subscribeToRoom();
      };

      client.current.onStompError = (frame) => {
        console.error('Websocket: STOMP 에러:', frame.headers['message']);
      };

      client.current.activate();
    }

    return () => {
      if (client.current) {
        if (!location.pathname.startsWith('/game')) {
          setRoomId('');
          console.log('Websocket: 연결 해제');
          client.current.deactivate();
        }
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    subscribeToRoom();
  }, [roomId]);

  const subscribeToRoom = () => {
    if (!client.current || !client.current.connected || !roomId) {
      return;
    }

    statusSubscription.current?.unsubscribe();
    roomSubscription.current?.unsubscribe();

    if (isGameWaitingPage) {
      statusSubscription.current = client.current.subscribe(`/topic/game/${roomId}/status`, (message) => {
        const { status } = JSON.parse(message.body);
        setRoomStatus(status);
      });
    }

    if (isGameStagePage) {
      roomSubscription.current = client.current.subscribe(`/topic/game/${roomId}`, (message) => {
        const { roomId, roomStatus, player1P, player2P, problemCardWithoutCardIds } = JSON.parse(message.body);

        setRoomInfo({ roomId, roomStatus, player1P, player2P, problemCardWithoutCardIds });
      });
    }
  };

  const sendMessage = (destination: string, payload?: unknown) => {
    if (!client.current || !client.current.connected) {
      console.error('Websocket: WebSocket이 아직 연결되지 않았습니다.');
      return;
    }

    console.log('WebSocket: 메시지 전송 중:', destination, payload);
    client.current.publish({ destination, body: JSON.stringify(payload) });
  };

  return { roomStatus, sendMessage, roomInfo, setRoomInfo };
};

export default useWebSocket;
