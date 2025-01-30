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

  setSolutionPage: (isSolution) => set({ isSolutionPage: isSolution }),

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
        [problemId]: state.options[problemId].map((option, idx) => ({
          ...option,
          state: idx === index ? newState : 'default',
        })),
      },
    })),

  toggleBookmark: (problemId) =>
    set((state) => ({
      bookmark: { ...state.bookmark, [problemId]: !state.bookmark[problemId] },
    })),

  initializeFromDetail: (examDetails) => {
    const options: Record<number, Option[]> = examDetails
      .filter((detail) => detail.problemType === 'MULTIPLE_CHOICE')
      .reduce<Record<number, Option[]>>((acc, detail) => {
        acc[detail.problemId] = detail.options.map((option: string) => ({
          text: option,
          state: 'default',
        }));
        return acc;
      }, {});

    set({ options, isSolutionPage: false });
  },

  initializeFromResults: (examResults) => {
    const { answers, options, bookmark } = examResults.reduce(
      (acc, result) => {
        acc.answers[result.problemId] = result.chosenAnswer || '';
        acc.bookmark[result.problemId] = result.bookmarkStatus || false;

        if (result.problemType === 'MULTIPLE_CHOICE') {
          acc.options[result.problemId] = result.options.map((option: string) => ({
            text: option,
            state: option === result.answer ? 'correct' : option === result.chosenAnswer ? 'wrong' : 'default',
          }));
        }
        return acc;
      },
      {
        answers: {} as Record<number, string>,
        options: {} as Record<number, Option[]>,
        bookmark: {} as Record<number, boolean>,
      },
    );

    set({ answers, options, bookmark, isSolutionPage: true });
  },
}));
