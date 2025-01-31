import TodayPage from '@/pages/today';
import OtherAnswerDetail from '@/pages/today/otheranswerdetail';
import OtherAnswerList from '@/pages/today/otheranswerlist';
import TodayResultPage from '@/pages/today/result';

const todayRoutes = [
  {
    path: 'today',
    children: [
      {
        index: true,
        element: <TodayPage />,
      },
      {
        path: 'result/:resultId',
        element: <TodayResultPage />,
      },
      {
        path: 'result/:resultId/otheranswers',
        element: <OtherAnswerList />,
      },
      {
        path: 'result/:resultId/otheranswers/:answerId',
        element: <OtherAnswerDetail />,
      },
    ],
  },
];

export default todayRoutes;
