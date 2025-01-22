import DashBoardLayout from '@/layouts/dashboardLayout';
import DashBoardPage from '@/pages/dashboard';

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
        element: <>recent</>,
      },
      {
        path: 'wrong',
        element: <>wrong</>,
      },
      {
        path: 'archive',
        element: <>archive</>,
      },
    ],
  },
];

export default dashBoardRoutes;
