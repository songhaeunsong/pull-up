import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Page404 from '../pages/404';
import DashBoardPage from '../pages/dashboard';
import GamePage from '../pages/game';
import ExamPage from '../pages/exam';
import RedirectPage from '../pages/redirect';
import SignInPage from '../pages/signIn';
import Todaypage from '@/pages/today';

import DashBoardLayout from '@/layouts/dashboardLayout';
import MainLayout from '@/layouts';
import ResultPage from '@/pages/today/result';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Todaypage />} />
          <Route path="/today/result" element={<ResultPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route index element={<DashBoardPage />} />
          </Route>
        </Route>
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
