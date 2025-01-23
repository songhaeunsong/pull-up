import { createBrowserRouter } from 'react-router-dom';
import dashBoardRoutes from './routes/dashboardRoutes';
import etcRoutes from './routes/etcRoutes';
import todayRoutes from './routes/todayRoutes';
import examRoutes from './routes/examRoutes';
import MainLayout from '@/layouts';
import gameRoutes from './routes/gameRoutes';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [...dashBoardRoutes, ...todayRoutes, ...examRoutes, ...etcRoutes, ...gameRoutes],
  },
];

const router = createBrowserRouter(routes);
export default router;
