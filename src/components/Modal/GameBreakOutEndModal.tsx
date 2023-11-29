import React from 'react';

import { Box, Modal } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import MiddleTypography from '@components/Typography/MiddleTypography';

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    [theme.breakpoints.between('min', 'max')]: {
      width: '55vw',
    },
    [theme.breakpoints.up('max')]: {
      width: '345px',
    },
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '5vh 2%',
  }))
);

type PropsType = {
  state: string;
};

const GameBreakOutEndModal = ({ state }: PropsType) => {
  const handleRetry = () => {
    location.reload();
  };

  return (
    <Modal
      disableAutoFocus={true}
      open={state === 'OVER' || state === 'SUCCESS'}
    >
      <ContainerBox>
        <MiddleTypography
          fontSize={{
            zero: '1.2rem',
            max: 'h4.fontSize',
          }}
        >
          {state === 'OVER' ? 'GAME OVER' : 'SUCCESS'}
        </MiddleTypography>
        <MiddleTypography
          textAlign='center'
          onClick={handleRetry}
          fontSize={{
            zero: '0.8rem',
            max: 'h6.fontSize',
          }}
          sx={(theme) => ({
            color: theme.palette.primary.main,
            cursor: 'pointer',
            marginTop: '2vh',
          })}
        >
          Try Again
        </MiddleTypography>
      </ContainerBox>
    </Modal>
  );
};

export default React.memo(GameBreakOutEndModal);
