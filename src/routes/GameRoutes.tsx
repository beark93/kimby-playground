import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const GameCard = React.lazy(() => import('@pages/Game/GameCard'));
const GameBreakOut = React.lazy(() => import('@pages/Game/GameBreakOut'));

import CardGameProvider from 'src/Provider/CardGameProvider';

const GameRoutes = {
  path: 'game',
  element: <Outlet />,
  children: [
    {
      path: 'card',
      element: (
        <React.Suspense fallback={<Loading />}>
          <CardGameProvider>
            <GameCard />
          </CardGameProvider>
        </React.Suspense>
      ),
    },
    {
      path: 'break-out',
      element: (
        <React.Suspense fallback={<Loading />}>
          <GameBreakOut />
        </React.Suspense>
      ),
    },
  ],
};

export default GameRoutes;
