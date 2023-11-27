import React from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '@pages/Loading';

const PokemonList = React.lazy(
  () => import(/*webpackChunkName: "pokemonList"*/ '@pages/Pokemon/PokemonList')
);

const PokemonRoutes = {
  path: 'pokemon',
  element: <Outlet />,
  children: [
    {
      path: 'list',
      element: (
        <React.Suspense fallback={<Loading />}>
          <PokemonList />
        </React.Suspense>
      ),
    },
  ],
};

export default PokemonRoutes;
