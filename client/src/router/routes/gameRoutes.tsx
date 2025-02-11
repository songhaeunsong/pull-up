import GamePage from '@/pages/game';
import GameResultPage from '@/pages/game/gameResult';
import GameStage from '@/pages/game/gameStage';

const gameRoutes = [
  {
    index: true,
    element: <GamePage />,
  },
  {
    path: ':gameId',
    element: <GameStage />,
  },
  {
    path: 'result',
    element: <GameResultPage />,
  },
];

export default gameRoutes;
