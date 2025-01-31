import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { RoomStatus, StompRoomInfo } from '@/types/game';

const useWebSocket = () => {
  const client = useRef<Client | null>(null);
  const location = useLocation();

  const [roomStatus, setRoomStatus] = useState<RoomStatus>('WAITING');
  const [roomInfo, setRoomInfo] = useState<StompRoomInfo>({
    roomId: '',
    player1P: { memberId: 0, name: '', score: 0 },
    player2P: { memberId: 0, name: '', score: 0 },
  });

  useEffect(() => {
    if (!client.current) {
      console.log('Websocket: 새로운 인스턴스 생성');
      client.current = new Client({
        webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_URL}/game-websocket`),
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
    }

    client.current.onConnect = () => {
      console.log('WebSocket: 연결 성공');

      // 방 상태 구독
      client.current!.subscribe('/topic/room-status', (message) => {
        const updatedStatus = JSON.parse(message.body);
        console.log('Websocket: 수신한 방 상태:', updatedStatus);
        setRoomStatus(updatedStatus.body.status);
        setRoomInfo({
          roomId: updatedStatus.body.roomId,
          player1P: {
            memberId: updatedStatus.body.player1P.memberId,
            name: updatedStatus.body.player1P.name,
            score: 0,
          },
          player2P: {
            memberId: updatedStatus.body.player2P.memberId,
            name: updatedStatus.body.player2P.name,
            score: 0,
          },
        });
      });

      client.current!.subscribe('/topic/answer-correct', (message) => {
        const { score1P, score2P } = JSON.parse(message.body);

        setRoomInfo((prevRoomInfo) => ({
          ...prevRoomInfo,

          player1P: {
            ...prevRoomInfo.player1P,
            score: score1P,
          },
          player2P: {
            ...prevRoomInfo.player2P,
            score: score2P,
          },
        }));
      });
    };

    client.current.onStompError = (frame) => {
      console.error('Websocket: STOMP 에러:', frame.headers['message']);
    };

    client.current.activate();

    return () => {
      if (client.current && !location.pathname.startsWith('/game')) {
        console.log('Websocket: 연결 해제');
        client.current.deactivate();
      }
    };
  }, [location.pathname]);

  const sendMessage = (destination: string, payload: unknown) => {
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
