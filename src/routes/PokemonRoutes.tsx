import { Outlet } from 'react-router-dom';

import PokemonList from '@pages/Pokemon/PokemonList';

const PokemonRoutes = {
  path: 'pokemon',
  element: <Outlet />,
  children: [
    {
      path: 'list',
      element: <PokemonList />,
    },
  ],
};

export default PokemonRoutes;
