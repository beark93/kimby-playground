import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const Main = React.lazy(
  () => import(/*webpackChunkName: "main"*/ '@pages/Main')
);

const MainRoutes = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: '/',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Main />
        </React.Suspense>
      ),
    },
  ],
};

export default MainRoutes;
