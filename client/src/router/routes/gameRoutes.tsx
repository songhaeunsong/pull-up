import GamePage from '@/pages/game';
import GameStage from '@/pages/game/gameStage';

const gameRoutes = [
  {
    path: 'game',
    children: [
      {
        index: true,
        element: <GamePage />,
      },
      {
        path: ':gameId',
        element: <GameStage />,
      },
    ],
  },
];

export default gameRoutes;
