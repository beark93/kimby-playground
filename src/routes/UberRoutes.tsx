import { Outlet } from 'react-router-dom';

import UberList from '@pages/uber/UberList';

const UberRoutes = {
  path: 'uber',
  element: <Outlet />,
  children: [
    {
      path: 'list',
      element: <UberList />,
    },
  ],
};

export default UberRoutes;
