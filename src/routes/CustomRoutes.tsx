import { Outlet } from 'react-router-dom';

import CustomDataGrid from '@pages/Custom/CustomDataGrid';

const CustomRoutes = {
  path: 'custom',
  element: <Outlet />,
  children: [
    {
      path: 'data-grid',
      element: <CustomDataGrid />,
    },
  ],
};

export default CustomRoutes;
