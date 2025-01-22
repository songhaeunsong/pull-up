import Page404 from '@/pages/404';
import ExamPage from '@/pages/exam';
import GamePage from '@/pages/game';
import HomePage from '@/pages/home';
import RedirectPage from '@/pages/redirect';
import SignInPage from '@/pages/signIn';
import SignUpPage from '@/pages/signup';

const etcRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'game',
    element: <GamePage />,
  },
  {
    path: 'exam',
    element: <ExamPage />,
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
  {
    path: 'redirect',
    element: <RedirectPage />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default etcRoutes;
