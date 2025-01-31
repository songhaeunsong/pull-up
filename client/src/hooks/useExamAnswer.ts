import { useExamStore } from '@/stores/examStore';

export const useExamAnswer = (problemId: number) => {
  const { answers, options, isSolutionPage, setAnswer, updateOptionState } = useExamStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (isSolutionPage) return;
    if (value.trim() === '' && value !== '') return; // 공백만 입력하는 것을 방지
    setAnswer(problemId, value);
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
