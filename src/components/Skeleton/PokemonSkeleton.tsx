import React from 'react';

import {
  Card,
  CardContent,
  CardActionArea,
  Skeleton,
  Typography,
} from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const StyledCard = React.memo(
  styled(Card)<CardProps>(() => ({
    width: '100%',
  }))
);

const PokemonSkeleton = () => {
  return (
    <StyledCard>
      <CardActionArea>
        <Skeleton
          variant='rounded'
          sx={{
            width: '100%',
            paddingBottom: '100%',
          }}
        />
        <CardContent
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Typography
            width='80%'
            fontSize={{ zero: '0.5rem', min: '3vw', max: '1rem' }}
          >
            <Skeleton />
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default React.memo(PokemonSkeleton);
