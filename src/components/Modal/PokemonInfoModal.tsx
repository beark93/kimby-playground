import React, { useCallback } from 'react';

import { Box, Grid, Modal, Skeleton } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import MiddleTypography from '@components/Typography/MiddleTypography';
import usePokemon from '@hooks/usePokemon';

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '252px',
    [theme.breakpoints.between('min', 'max')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('max')]: {
      width: '575px',
    },
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '2%',
  }))
);

const TypeBox = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    width: '20%',
    textAlign: 'center',
    fontSize: '0.6rem',
    borderRadius: '20% 20% 20% 20% / 50% 50% 50% 50%',
    color: '#fff',
    padding: '.5% 0',
    marginRight: '2%',
    [theme.breakpoints.between('min', 'max')]: {
      fontSize: '3.5vw',
    },
    [theme.breakpoints.up('max')]: {
      fontSize: '1.2rem',
    },

    '&.normal': {
      backgroundColor: '#949495',
    },
    '&.fire': {
      backgroundColor: '#e56c3e',
    },
    '&.water': {
      backgroundColor: '#5185c5',
    },
    '&.grass': {
      backgroundColor: '#66a945',
    },
    '&.electric': {
      backgroundColor: '#f6d851',
    },
    '&.ice': {
      backgroundColor: '#6dc8eb',
    },
    '&.fighting': {
      backgroundColor: '#e09c40',
    },
    '&.poison': {
      backgroundColor: '#735198',
    },
    '&.ground': {
      backgroundColor: '#9c7743',
    },
    '&.flying': {
      backgroundColor: '#a2c3e7',
    },
    '&.psychic': {
      backgroundColor: '#dd6b7b',
    },
    '&.bug': {
      backgroundColor: '#9fa244',
    },
    '&.rock': {
      backgroundColor: '#bfb889',
    },
    '&.ghost': {
      backgroundColor: '#684870',
    },
    '&.dragon': {
      backgroundColor: '#535ca8',
    },
    '&.dark': {
      backgroundColor: '#4c4948',
    },
    '&.steel': {
      backgroundColor: '#69a9c7',
    },
    '&.fairy': {
      backgroundColor: '#dab4d4',
    },
  }))
);

type PropsType = {
  open: boolean;
  id: string;
  onClose: () => void;
};

const PokemonInfoModal = ({ open, id, onClose }: PropsType) => {
  const errorHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  const pokemon = usePokemon(id, errorHandler);

  return (
    <Modal disableAutoFocus={true} open={open}>
      <ContainerBox>
        {pokemon ? (
          <Grid container>
            <Grid item zero={3}>
              <MiddleTypography
                fontSize={{
                  zero: '1.2rem',
                  min: '7vw',
                  max: '2.5rem',
                }}
              >
                {`No.${id}`}
              </MiddleTypography>
            </Grid>
            <Grid item zero={6}>
              <MiddleTypography
                fontSize={{
                  zero: '1.2rem',
                  min: '7vw',
                  max: '2.5rem',
                }}
              >
                {pokemon.name}
              </MiddleTypography>
            </Grid>
            <Grid item zero={3}>
              <MiddleTypography>
                <CloseIcon
                  onClick={onClose}
                  sx={{
                    cursor: 'pointer',
                    fontSize: {
                      zero: '1.2rem',
                      min: '7vw',
                      max: '2.5rem',
                    },
                  }}
                />
              </MiddleTypography>
            </Grid>
            <Grid item zero={1}></Grid>
            <Grid item zero={5} p={1}>
              <img src={pokemon.image.front_default} width='100%' />
            </Grid>
            <Grid item zero={5} p={1}>
              <img src={pokemon.image.front_shiny} width='100%' />
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
              {pokemon.types.map((it) => (
                <TypeBox key={`poke-type-${it.name}`} className={it.name}>
                  {it.nameKor}
                </TypeBox>
              ))}
            </Grid>
          </Grid>
        ) : (
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
          </Grid>
        )}
      </ContainerBox>
    </Modal>
  );
};

export default React.memo(PokemonInfoModal);
