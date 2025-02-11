import InterviewPage from '@/pages/interview';
import InterviewAnswerDetail from '@/pages/interview/interviewAnswerDetail';
import InterviewAnswersPage from '@/pages/interview/interviewAnswers';
import InterviewResultPage from '@/pages/interview/result';

const interviewRoutes = [
  {
    path: 'interview',
    children: [
      {
        index: true,
        element: <InterviewPage />,
      },
      {
        path: 'result/:interviewAnswerId',
        element: <InterviewResultPage />,
      },
      {
        path: ':interviewId/answers',
        element: <InterviewAnswersPage />,
      },
      {
        path: ':interviewId/answers/:interviewAnswerId',
        element: <InterviewAnswerDetail />,
      },
    ],
  },
];

export default interviewRoutes;
