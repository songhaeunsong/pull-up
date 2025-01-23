import DashBoardLayout from '@/layouts/dashboardLayout';
import DashBoardPage from '@/pages/dashboard';
import Recent from '@/pages/dashboard/recent';
import Wrong from '@/pages/dashboard/wrong';
import Archive from '@/pages/dashboard/archive';

const dashBoardRoutes = [
  {
    path: 'dashboard',
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: 'recent',
        element: <Recent />,
      },
      {
        path: 'wrong',
        element: <Wrong />,
      },
      {
        path: 'archive',
        element: <Archive />,
      },
    ],
  },
];

export default dashBoardRoutes;
