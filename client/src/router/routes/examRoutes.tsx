import ExamPage from '@/pages/exam';
import ExamDetailPage from '@/pages/exam/detail';
import ProblemDetail from '@/pages/exam/problemDetail';
import ExamResultPage from '@/pages/exam/result';

const examRoutes = [
  {
    path: 'exam',
    children: [
      { index: true, element: <ExamPage /> },
      { path: ':examId', element: <ExamDetailPage /> },
      { path: ':examId/result', element: <ExamResultPage /> },
      { path: 'problem/:problemId', element: <ProblemDetail /> },
    ],
  },
];

export default examRoutes;
