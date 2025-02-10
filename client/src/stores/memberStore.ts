import { Member } from '@/types/member';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MemberState {
  member: Member | null;
  isLoggedIn: boolean;
  isSolvedToday: boolean;
  interviewId: number;
  interviewAnswerId: number;
  setMember: (member: Member) => void;
  setIsSolvedToday: (isSolvedToday: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setInterviewId: (interviewId: number) => void;
  setInteverviewAnswerId: (interviewAnswerId: number) => void;
  logoutMember: () => void;
}

const initialState = {
  member: null,
  isLoggedIn: false,
  isSolvedToday: false,
  interviewId: 0,
  interviewAnswerId: 0,
};

export const memberStore = create<MemberState>()(
  persist(
    (set) => ({
      ...initialState,
      setMember: (member) => set({ member }),
      setIsSolvedToday: (isSolvedToday) => set({ isSolvedToday }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setInterviewId: (interviewId) => set({ interviewId }),
      setInteverviewAnswerId: (interviewAnswerId) => set({ interviewAnswerId }),
      logoutMember: () => {
        set(initialState);
        sessionStorage.removeItem('member-storage');
      },
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        email: state.member?.email,
        isLoggedIn: state.isLoggedIn,
        isSolvedToday: state.isSolvedToday,
        interviewId: state.interviewId,
        interviewAnswerId: state.interviewAnswerId,
      }),
    },
  ),
);
