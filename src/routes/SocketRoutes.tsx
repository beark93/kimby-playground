import { Outlet } from 'react-router-dom';

import SocketTest from '@pages/content/SocketTest';

const SocketRoutes = {
  path: 'socket',
  element: <Outlet />,
  children: [
    {
      path: 'test',
      element: <SocketTest />,
    },
  ],
};

export default SocketRoutes;
