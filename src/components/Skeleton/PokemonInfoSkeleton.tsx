import React from 'react';

import { Box, Grid, Skeleton } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import MiddleTypography from '@components/Typography/MiddleTypography';

const DescriptionBox = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    width: '100%',
    border: '1px solid #ececec',
    borderRadius: '10px',
    padding: '10px 5px',
    fontSize: '0.5rem',
    height: '60px',
    [theme.breakpoints.between('min', 'max')]: {
      fontSize: '3vw',
      height: '20vw',
      padding: '3vw 1.5vw',
    },
    [theme.breakpoints.up('max')]: {
      fontSize: '1.2rem',
      height: '120px',
      padding: '20px 10px',
    },
  }))
);

const PokemonInfoSkeleton = () => {
  return (
    <Grid container>
      <Grid item zero={3}>
        <MiddleTypography
          width='60%'
          fontSize={{
            zero: '1.2rem',
            min: '7vw',
            max: '2.5rem',
          }}
        >
          <Skeleton variant='rounded' />
        </MiddleTypography>
      </Grid>
      <Grid item zero={6}>
        <MiddleTypography
          width='70%'
          fontSize={{
            zero: '1.2rem',
            min: '7vw',
            max: '2.5rem',
          }}
        >
          <Skeleton variant='rounded' />
        </MiddleTypography>
      </Grid>
      <Grid item zero={3}></Grid>
      <Grid item zero={1}></Grid>
      <Grid item zero={5} p={1}>
        <Skeleton
          component='div'
          variant='rounded'
          sx={{
            width: '100%',
            paddingBottom: '100%',
          }}
        />
      </Grid>
      <Grid item zero={5} p={1}>
        <Skeleton
          component='div'
          variant='rounded'
          sx={{
            width: '100%',
            paddingBottom: '100%',
          }}
        />
      </Grid>
      <Grid item zero={1}></Grid>
      <Grid
        item
        zero={12}
        display='flex'
        flexDirection='row'
        justifyContent='center'
        p={1}
      >
        <Skeleton
          component='div'
          variant='rounded'
          width='20%'
          sx={{ height: { zero: '19px', min: '6vw', max: '34px' } }}
        />
      </Grid>
      <Grid
        item
        zero={12}
        display='flex'
        flexDirection='row'
        justifyContent='center'
        p={1}
      >
        <DescriptionBox>
          <Skeleton variant='rounded' />
        </DescriptionBox>
      </Grid>
    </Grid>
  );
};

export default React.memo(PokemonInfoSkeleton);
