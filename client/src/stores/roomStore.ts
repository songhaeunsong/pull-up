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
    sessionStorage.setItem('roomId', id);
    set({ roomId: id });
  },
}));
