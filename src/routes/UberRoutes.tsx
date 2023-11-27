import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const UberList = React.lazy(
  () => import(/*webpackChunkName: "uberList"*/ '@pages/Uber/UberList')
);

const UberRoutes = {
  path: 'uber',
  element: <Outlet />,
  children: [
    {
      path: 'list',
      element: (
        <React.Suspense fallback={<Loading />}>
          <UberList />
        </React.Suspense>
      ),
    },
  ],
};

export default UberRoutes;
