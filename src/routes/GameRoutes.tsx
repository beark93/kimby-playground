import { Outlet } from 'react-router-dom';

import GameCard from '@pages/Game/GameCard';
import GameBreakOut from '@pages/Game/GameBreakOut';

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
      path: 'break-out',
      element: <GameBreakOut />,
    },
  ],
};

export default GameRoutes;
