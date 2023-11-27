import { useRoutes } from 'react-router-dom';

import HomeRoutes from './HomeRoutes';
import UberRoutes from './UberRoutes';
import GameRoutes from './GameRoutes';
import CustomRoutes from './CustomRoutes';
import PokemonRoutes from './PokemonRoutes';

export default function PageRoutes() {
  return useRoutes([
    HomeRoutes,
    UberRoutes,
    GameRoutes,
    CustomRoutes,
    PokemonRoutes,
  ]);
}
