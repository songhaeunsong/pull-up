import { create } from 'zustand';

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
  updateOptionState: (problemId: number, index: number, state: Option['state']) => void;
  toggleBookmark: (problemId: number) => void;
  initializeAndSetOptions: (
    problemId: number,
    options: string[],
    params?: { answer?: string; chosenAnswer?: string },
  ) => void;
  resetExamState: () => void;
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

  initializeAndSetOptions: (problemId, options, params) => {
    const initializedOptions: Option[] = options.map((option) => ({
      text: option,
      state: params?.answer
        ? option === params.answer
          ? 'correct'
          : option === params.chosenAnswer
            ? 'wrong'
            : 'default'
        : 'default',
    }));

    set((state) => ({
      options: {
        ...state.options,
        [problemId]: initializedOptions,
      },
    }));
  },
  resetExamState: () => set({ isSolutionPage: false, answers: {}, options: {}, bookmark: {} }),
}));
