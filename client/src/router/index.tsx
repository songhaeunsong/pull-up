import { createBrowserRouter } from 'react-router-dom';
import dashBoardRoutes from './routes/dashboardRoutes';
import etcRoutes from './routes/etcRoutes';
import interviewRoutes from './routes/interviewRoutes';
import examRoutes from './routes/examRoutes';
import MainLayout from '@/layouts';
import gameRoutes from './routes/gameRoutes';
import { RefreshHandler } from '@/utils/refreshHandler';

const routes = [
  {
    path: '/',
    element: (
      <RefreshHandler>
        <MainLayout />,
      </RefreshHandler>
    ),
    children: [...dashBoardRoutes, ...interviewRoutes, ...examRoutes, ...etcRoutes, ...gameRoutes],
  },
];

const router = createBrowserRouter(routes);
export default router;
