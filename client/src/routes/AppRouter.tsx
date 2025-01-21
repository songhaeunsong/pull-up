import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Page404 from '../pages/404';
import DashBoardPage from '../pages/dashboard';
import GamePage from '../pages/game';
import ExamPage from '@/pages/exam';
import ExamSolvePage from '@/pages/exam/solve';
import ExamResultPage from '@/pages/exam/result';
import RedirectPage from '../pages/redirect';
import SignInPage from '../pages/signIn';
import TodayPage from '@/pages/today';

import DashBoardLayout from '@/layouts/dashboardLayout';
import MainLayout from '@/layouts';
import TodayResultPage from '@/pages/today/result';
import OtherAnswerList from '@/pages/today/otheranswerlist';
import OtherAnswerDetail from '@/pages/today/otheranswerdetail';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/today/result" element={<TodayResultPage />} />
          <Route path="/today/otheranswers" element={<OtherAnswerList />} />
          <Route path="/today/otheranswers/:answerId" element={<OtherAnswerDetail />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/exam">
            <Route index element={<ExamPage />} />
            <Route path="solve" element={<ExamSolvePage />} />
            <Route path="result" element={<ExamResultPage />} />
          </Route>
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
