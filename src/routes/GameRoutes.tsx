import { Outlet } from 'react-router-dom';

import GameCard from '@pages/game/GameCard';
import GameBall from '@pages/game/GameBall';

import CardGameProvider from 'src/Provider/CardGameProvider';

const GameRoutes = {
  path: 'game',
  element: <Outlet />,
  children: [
    {
      path: 'card',
      element: (
        <CardGameProvider>
          <GameCard />
        </CardGameProvider>
      ),
    },
    {
      path: 'ball',
      element: <GameBall />,
    },
  ],
};

export default GameRoutes;
