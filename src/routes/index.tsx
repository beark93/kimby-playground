import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import UberRoutes from './UberRoutes';
import SocketRoutes from './SocketRoutes';
import GameRoutes from './GameRoutes';

export default function PageRoutes() {
  return useRoutes([MainRoutes, UberRoutes, SocketRoutes, GameRoutes]);
}
