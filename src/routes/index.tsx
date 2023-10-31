import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import UberRoutes from './UberRoutes';
import GameRoutes from './GameRoutes';
import CustomRoutes from './CustomRoutes';

export default function PageRoutes() {
  return useRoutes([MainRoutes, UberRoutes, GameRoutes, CustomRoutes]);
}
