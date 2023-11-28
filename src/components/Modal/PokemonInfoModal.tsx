import React, { useCallback } from 'react';

import { Box, Modal } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import PokemonInfoContent from '@components/Content/PokemonInfoContent';
import PokemonInfoSkeleton from '@components/Skeleton/PokemonInfoSkeleton';
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
    padding: '2vh',
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
          <PokemonInfoContent pokemon={pokemon} onClose={onClose} />
        ) : (
          <PokemonInfoSkeleton />
        )}
      </ContainerBox>
    </Modal>
  );
};

export default React.memo(PokemonInfoModal);
