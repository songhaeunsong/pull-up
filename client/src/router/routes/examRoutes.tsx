import ExamPage from '@/pages/exam';
import ExamResultPage from '@/pages/exam/result';
import ExamSolvePage from '@/pages/exam/solve';

const examRoutes = [
  {
    path: 'exam',
    children: [
      { index: true, element: <ExamPage /> },
      { path: 'solve', element: <ExamSolvePage /> },
      { path: 'result', element: <ExamResultPage /> },
    ],
  },
];

export default examRoutes;
