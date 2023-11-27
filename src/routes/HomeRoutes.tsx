import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const Home = React.lazy(
  () => import(/*webpackChunkName: "home"*/ '@pages/Home')
);

const MainRoutes = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: '/',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Home />
        </React.Suspense>
      ),
    },
  ],
};

export default MainRoutes;
