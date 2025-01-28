import { useExamStore } from '@/stores/examStore';

export const useExamAnswer = (problemId: number) => {
  const { answers, options, isSolutionPage, setAnswer, updateOptionState } = useExamStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSolutionPage) return;
    setAnswer(problemId, e.target.value);
  };

  const handleOptionClick = (index: number) => {
    if (isSolutionPage) return;
    const problemOptions = options[problemId] || [];
    setAnswer(problemId, problemOptions[index].text);
    updateOptionState(problemId, index, 'selected');
  };

  return {
    chosenAnswer: answers[problemId] || '',
    problemOptions: options[problemId] || [],
    handleTextChange,
    handleOptionClick,
    isSolutionPage,
  };
};
