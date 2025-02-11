import { create } from 'zustand';

interface RoomState {
  roomId: string;
  setRoomId: (id: string) => void;
}

const getStoredRoomId = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('roomId') || '';
  }
  return '';
};

export const useRoomStore = create<RoomState>((set) => ({
  roomId: getStoredRoomId(),

  setRoomId: (id) => {
    if (!id.length) {
      sessionStorage.removeItem('roomId');
      set({ roomId: '' });
      return;
    }

    set({ roomId: id });
    sessionStorage.setItem('roomId', id);
  },
}));
