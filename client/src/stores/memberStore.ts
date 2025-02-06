import { Member } from '@/types/member';
import { create } from 'zustand';

interface MemberState {
  member: Member;
  isSolvedToday: boolean;
  setMember: (member: Member) => void;
  setIsSolvedToday: (isSolvedToday: boolean) => void;
}

// 더미데이터
const mockMember = {
  name: '김싸피',
  email: 'ssafy@ssafy.com',
  profileImageUrl: 'https://placehold.co/400x400',
  interestSubjects: ['ALGORITHM', 'DATA_STRUCTURE', 'NETWORK'],
};

export const memberStore = create<MemberState>((set) => ({
  member: mockMember as Member,
  isSolvedToday: false,
  setMember: (member) => set({ member }),
  setIsSolvedToday: (isSolvedToday) => set({ isSolvedToday }),
}));
