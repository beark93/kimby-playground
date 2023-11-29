import React from 'react';

import { Box, Modal } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
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

type PropsType = {
  open: boolean;
  handleStart: () => void;
};

const GameBreakOutStartModal = ({ open, handleStart }: PropsType) => {
  return (
    <Modal disableAutoFocus={true} open={open}>
      <ContainerBox>
        <MiddleTypography
          onClick={handleStart}
          fontSize={{
            zero: '2rem',
            max: 'h1.fontSize',
          }}
          sx={() => ({
            color: '#fff',
            cursor: 'pointer',
          })}
        >
          Start
        </MiddleTypography>
      </ContainerBox>
    </Modal>
  );
};

export default React.memo(GameBreakOutStartModal);
