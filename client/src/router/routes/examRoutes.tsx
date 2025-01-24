import ExamPage from '@/pages/exam';
import ExamDetailPage from '@/pages/exam/detail';
import ExamResultPage from '@/pages/exam/result';

const examRoutes = [
  {
    path: 'exam',
    children: [
      { index: true, element: <ExamPage /> },
      { path: ':examId', element: <ExamDetailPage /> },
      { path: ':examId/result', element: <ExamResultPage /> },
    ],
  },
];

export default examRoutes;
