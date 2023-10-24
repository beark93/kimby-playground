import { Outlet } from 'react-router-dom';

import GameCard from '@pages/content/GameCard';
import CardGameProvider from '@components/Provider/CardGameProvider';

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
  ],
};

export default GameRoutes;
