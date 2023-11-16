import React from 'react';

import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import { PokeType } from '@utils/poke';

const StyledCard = React.memo(
  styled(Card)<CardProps>(() => ({
    width: '100%',
  }))
);

type PropsType = {
  pokemon: PokeType;
  onClick: (id: string) => void;
};

const PokemonCard = ({ pokemon, onClick }: PropsType) => {
  return (
    <StyledCard>
      <CardActionArea onClick={() => onClick(pokemon.id)}>
        <CardMedia
          component='img'
          src={pokemon.image}
          loading='lazy'
          sx={{
            width: '100%',
            aspectRatio: 1,
          }}
        />
        <CardContent sx={{ p: 0, textAlign: 'center', lineHeight: 0 }}>
          <Typography
            fontSize={{ zero: '0.5rem', min: '3vw', max: '1rem' }}
            color='inherit'
          >
            {pokemon.nameKor}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default React.memo(PokemonCard);
