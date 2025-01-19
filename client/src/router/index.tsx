import { createBrowserRouter } from 'react-router-dom';
import dashBoardRoutes from './routes/dashboardRoutes';
import etcRoutes from './routes/etcRoutes';
import Layout from '@/components/Layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [...dashBoardRoutes, ...etcRoutes],
  },
];

const router = createBrowserRouter(routes);
export default router;
