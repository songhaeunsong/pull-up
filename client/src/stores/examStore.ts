import { create } from 'zustand';
import { ExamResultResponse, ExamDetailsResponse } from '@/types/exam';

interface Option {
  text: string;
  state: 'default' | 'selected' | 'correct' | 'wrong';
}

interface ExamState {
  answers: Record<number, string>;
  options: Record<number, Option[]>;
  setOptions: (problemId: number, options: Option[]) => void;
  updateOptionState: (problemId: number, index: number, state: Option['state']) => void;
  isSolutionPage: boolean;
  setSolutionPage: (isSolution: boolean) => void;
  bookmarks: Record<number, boolean>;
  setAnswer: (problemId: number, answer: string) => void;
  toggleBookmark: (problemId: number) => void;
  initializeFromDetail: (examDetails: ExamDetailsResponse) => void;
  initializeFromResults: (examResults: ExamResultResponse['examResultDetailDtos']) => void;
}

export const useExamStore = create<ExamState>((set) => ({
  answers: {},
  options: {},
  bookmarks: {},
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
      bookmarks: { ...state.bookmarks, [problemId]: !state.bookmarks[problemId] },
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
    const bookmarks: Record<number, boolean> = {};

    examResults.forEach((result) => {
      answers[result.problemId] = result.chosenAnswer || '';
      bookmarks[result.problemId] = result.bookmarkStatus || false;
      if (result.problemType === 'MULTIPLE_CHOICE' && result.options.length > 0) {
        options[result.problemId] = result.options.map((option: string) => ({
          text: option,
          state: option === result.answer ? 'correct' : option === result.chosenAnswer ? 'wrong' : 'default',
        }));
      }
    });
    set({ answers, options, bookmarks, isSolutionPage: true });
  },
}));
