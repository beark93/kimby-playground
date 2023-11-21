import { Outlet } from 'react-router-dom';

import CustomDataGrid from '@pages/custom/CustomDataGrid';

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
