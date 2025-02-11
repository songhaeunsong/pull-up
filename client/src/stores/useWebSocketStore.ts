import { create } from 'zustand';
import { Client, StompSubscription } from '@stomp/stompjs';
import { RoomStatus, StompGameResult, StompRoomInfo } from '@/types/game';
import { useRoomStore } from '@/stores/roomStore';

interface WebSocketState {
  client: Client | null;
  roomStatus: RoomStatus;
  roomInfo: StompRoomInfo;
  gameResult: StompGameResult;
  statusSubscription: StompSubscription | null;
  roomSubscription: StompSubscription | null;
  gameResultSubscription: StompSubscription | null;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  updateSubscription: (roomId: string) => void;
  sendMessage: (destination: string, payload?: unknown) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  roomStatus: 'WAITING',
  roomInfo: {
    roomId: '',
    gameRoomStatus: 'WAITING',
    player1P: { memberId: 0, name: '', score: 0 },
    player2P: { memberId: 0, name: '', score: 0 },
    problemCardWithoutCardIds: [],
  },
  gameResult: {
    isDraw: true,
    isForfeit: false,
    player1P: {
      name: '',
      score: 0,
      status: 'DRAW',
    },
    player2P: {
      name: '',
      score: 0,
      status: 'DRAW',
    },
  },
  statusSubscription: null,
  roomSubscription: null,
  gameResultSubscription: null,

  connectWebSocket: () => {
    if (get().client) return;

    const client = new Client({
      webSocketFactory: () => new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('WebSocket: 연결 성공');
      get().updateSubscription(useRoomStore.getState().roomId);
    };

    client.onStompError = (frame) => {
      console.error('Websocket: STOMP 에러:', frame.headers['message']);
    };

    client.activate();
    set({ client });
  },

  disconnectWebSocket: () => {
    const { client, statusSubscription, roomSubscription, gameResultSubscription } = get();

    if (statusSubscription) {
      statusSubscription.unsubscribe();
    }
    if (roomSubscription) {
      roomSubscription.unsubscribe();
    }
    if (gameResultSubscription) {
      gameResultSubscription.unsubscribe();
    }

    if (client) {
      console.log('WebSocket: 연결 해제');
      client.deactivate();
      set({ client: null });
    }
  },

  updateSubscription: (roomId: string) => {
    const { client, statusSubscription, roomSubscription, gameResultSubscription } = get();
    if (!client || !client.connected) return;

    statusSubscription?.unsubscribe();
    roomSubscription?.unsubscribe();
    gameResultSubscription?.unsubscribe();

    console.log(`WebSocket: ${roomId} 구독 변경`);

    const statusSub = client.subscribe(`/topic/game/${roomId}/status`, (message) => {
      // SendTo: /app/game/${roomId}/status
      const { status } = JSON.parse(message.body);
      set({ roomStatus: status });
    });

    const roomSub = client.subscribe(`/topic/game/${roomId}`, (message) => {
      // SendTo: /app/game/{roomId}

      const { roomId, gameRoomStatus, player1P, player2P, problemCardWithoutCardIds } = JSON.parse(message.body);
      set({ roomInfo: { roomId, gameRoomStatus, player1P, player2P, problemCardWithoutCardIds } });
    });

    const resultSub = client.subscribe(`/topic/game/${roomId}/result`, (message) => {
      // SendTo: /app/game/{roomId}/result

      const { isDraw, isForfeit, player1P, player2P } = JSON.parse(message.body);
      set({ gameResult: { isDraw, isForfeit, player1P, player2P } });
    });

    set({ statusSubscription: statusSub, roomSubscription: roomSub, gameResultSubscription: resultSub });
  },

  sendMessage: (destination, payload) => {
    const { client } = get();

    if (!client || !client.connected) {
      console.error('Websocket: WebSocket이 아직 연결되지 않았습니다.');
      return;
    }

    console.log('WebSocket: 메시지 전송 중:', destination, payload);
    client.publish({ destination, body: JSON.stringify(payload) });
  },
}));
