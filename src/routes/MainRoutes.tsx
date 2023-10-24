import { Outlet } from 'react-router-dom';

import Main from '@pages/Main';

const MainRoutes = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: '/',
      element: <Main />,
    },
  ],
};

export default MainRoutes;
