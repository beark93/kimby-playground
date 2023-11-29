import React from 'react';

import { Box, Button, Modal } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import MiddleTypography from '@components/Typography/MiddleTypography';

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(() => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2vh 2%',
  }))
);

const BackDropTypography = React.memo(
  styled(MiddleTypography)<TypographyProps>(({ theme }) => ({
    padding: '0 10px',
    fontSize: '1.8rem',
    [theme.breakpoints.between('min', 'max')]: {
      fontSize: '10vw',
      padding: '0 4vw',
    },
    [theme.breakpoints.up('max')]: {
      fontSize: '5rem',
      padding: '0 40px',
    },
  }))
);

type PropsType = {
  open: boolean;
  handleStart: () => void;
};

const GameBreakOutStartModal = ({ open, handleStart }: PropsType) => {
  return (
    <Modal disableAutoFocus={true} open={open}>
      <ContainerBox>
        <Button onClick={handleStart} variant='contained'>
          <BackDropTypography>Start</BackDropTypography>
        </Button>
      </ContainerBox>
    </Modal>
  );
};

export default React.memo(GameBreakOutStartModal);
