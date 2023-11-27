import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const CustomDataGrid = React.lazy(
  () =>
    import(
      /*webpackChunkName: "customDataGrid"*/ '@pages/Custom/CustomDataGrid'
    )
);

const CustomRoutes = {
  path: 'custom',
  element: <Outlet />,
  children: [
    {
      path: 'data-grid',
      element: (
        <React.Suspense fallback={<Loading />}>
          <CustomDataGrid />
        </React.Suspense>
      ),
    },
  ],
};

export default CustomRoutes;
