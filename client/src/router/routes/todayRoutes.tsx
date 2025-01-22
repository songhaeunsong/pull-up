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
        path: 'result',
        element: <TodayResultPage />,
      },
      {
        path: 'otheranswers',
        element: <OtherAnswerList />,
        children: [
          {
            path: ':answerId',
            element: <OtherAnswerDetail />,
          },
        ],
      },
    ],
  },
];

export default todayRoutes;
