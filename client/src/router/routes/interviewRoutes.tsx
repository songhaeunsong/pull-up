import InterviewPage from '@/pages/interview';
import InterviewAnswerDetail from '@/pages/interview/interviewAnswerDetail';
import InterviewAnswerList from '@/pages/interview/interviewAnswerList';
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
        path: 'result/:interviewId',
        element: <InterviewResultPage />,
      },
      {
        path: 'result/:interviewId/answers',
        element: <InterviewAnswerList />,
      },
      {
        path: 'result/:interviewId/answers/:interviewAnswerId',
        element: <InterviewAnswerDetail />,
      },
    ],
  },
];

export default interviewRoutes;
