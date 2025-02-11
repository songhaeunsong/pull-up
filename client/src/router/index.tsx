import { createBrowserRouter } from 'react-router-dom';
import dashBoardRoutes from './routes/dashboardRoutes';
import etcRoutes from './routes/etcRoutes';
import interviewRoutes from './routes/interviewRoutes';
import examRoutes from './routes/examRoutes';
import MainLayout from '@/layouts';
import gameRoutes from './routes/gameRoutes';
import GameLayout from '@/layouts/gameLayout';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [...dashBoardRoutes, ...interviewRoutes, ...examRoutes, ...etcRoutes, ...gameRoutes],
  },
  {
    path: '/game',
    element: <GameLayout />,
    children: [...gameRoutes],
  },
];

const router = createBrowserRouter(routes);
export default router;
