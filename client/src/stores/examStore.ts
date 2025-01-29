import { create } from 'zustand';
import { ExamResultResponse, ExamDetailsResponse } from '@/types/exam';

interface Option {
  text: string;
  state: 'default' | 'selected' | 'correct' | 'wrong';
}

interface ExamState {
  isSolutionPage: boolean;
  answers: Record<number, string>;
  options: Record<number, Option[]>;
  bookmark: Record<number, boolean>;
  setSolutionPage: (isSolution: boolean) => void;
  setAnswer: (problemId: number, answer: string) => void;
  setOptions: (problemId: number, options: Option[]) => void;
  updateOptionState: (problemId: number, index: number, state: Option['state']) => void;
  toggleBookmark: (problemId: number) => void;
  initializeFromDetail: (examDetails: ExamDetailsResponse) => void;
  initializeFromResults: (examResults: ExamResultResponse['examResultDetailDtos']) => void;
}

export const useExamStore = create<ExamState>((set) => ({
  answers: {},
  options: {},
  bookmark: {},
  isSolutionPage: false,
  setAnswer: (problemId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [problemId]: answer },
    })),
  setOptions: (problemId, options) =>
    set((state) => ({
      options: { ...state.options, [problemId]: options },
    })),
  updateOptionState: (problemId, index, newState) =>
    set((state) => ({
      options: {
        ...state.options,
        [problemId]: state.options[problemId].map((option, idx) =>
          idx === index ? { ...option, state: newState } : { ...option, state: 'default' },
        ),
      },
    })),
  setSolutionPage: (isSolution) => set({ isSolutionPage: isSolution }),
  toggleBookmark: (problemId) =>
    set((state) => ({
      bookmark: { ...state.bookmark, [problemId]: !state.bookmark[problemId] },
    })),

  initializeFromDetail: (examDetails) => {
    const options: Record<number, Option[]> = {};

    examDetails.forEach((detail) => {
      if (detail.problemType === 'MULTIPLE_CHOICE' && detail.options.length > 0) {
        options[detail.problemId] = detail.options.map((option: string) => ({
          text: option,
          state: 'default',
        }));
      }
    });

    set({ options, isSolutionPage: false });
  },

  initializeFromResults: (examResults) => {
    const answers: Record<number, string> = {};
    const options: Record<number, Option[]> = {};
    const bookmark: Record<number, boolean> = {};

    examResults.forEach((result) => {
      answers[result.problemId] = result.chosenAnswer || '';
      bookmark[result.problemId] = result.bookmarkStatus || false;
      if (result.problemType === 'MULTIPLE_CHOICE' && result.options.length > 0) {
        options[result.problemId] = result.options.map((option: string) => ({
          text: option,
          state: option === result.answer ? 'correct' : option === result.chosenAnswer ? 'wrong' : 'default',
        }));
      }
    });
    set({ answers, options, bookmark, isSolutionPage: true });
  },
}));
