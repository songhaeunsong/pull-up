import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = () => {
  const client = useRef<Client | null>(null);
  const [roomStatus, setRoomStatus] = useState('WAITING'); // 방 상태
  const [roomInfo, setRoomInfo] = useState({
    roomId: '',
    player1P: { memberId: 0, name: '', score: 0 },
    player2P: { memberId: 0, name: '', score: 0 },
  });

  useEffect(() => {
    console.log('roomInfo', roomInfo);
  }, [roomInfo]);

  useEffect(() => {
    console.log('SockJS 연결 초기화');

    client.current = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_BASE_URL}/game-websocket`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      console.log('WebSocket 연결 성공');

      // 방 상태 구독
      client.current!.subscribe('/topic/room-status', (message) => {
        const updatedStatus = JSON.parse(message.body);
        console.log('수신한 방 상태:', updatedStatus);
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
      console.error('STOMP 에러:', frame.headers['message']);
    };

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const sendMessage = (destination: string, payload: unknown) => {
    if (!client.current || !client.current.connected) {
      console.error('WebSocket이 아직 연결되지 않았습니다.');
      return;
    }

    console.log('WebSocket 메시지 전송 중:', destination, payload);
    client.current.publish({ destination, body: JSON.stringify(payload) });
  };

  return { roomStatus, sendMessage, roomInfo, setRoomInfo };
};

export default useWebSocket;
