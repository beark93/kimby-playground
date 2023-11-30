import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const GameCard = React.lazy(
  () => import(/*webpackChunkName: "gameCard"*/ '@pages/Game/GameCard')
);
const GameBreakOut = React.lazy(
  () => import(/*webpackChunkName: "gameBreakOut"*/ '@pages/Game/GameBreakOut')
);

const GameRoutes = {
  path: 'game',
  element: <Outlet />,
  children: [
    {
      path: 'card',
      element: (
        <React.Suspense fallback={<Loading />}>
          <GameCard />
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
