import React from 'react';

import { Typography, Modal, Paper } from '@mui/material';
import { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import {
  GAME_TIME,
  useCardGameState,
  useCardGameTimer,
} from 'src/Provider/CardGameProvider';

const ModalPaper = React.memo(
  styled(Paper)<PaperProps>(({ theme }) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '125px',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    width: '176px',
    height: '132px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.between('min', 'max')]: {
      left: '50%',
      width: '70vw',
      height: '52.5vw',
    },
    [theme.breakpoints.up('max')]: {
      left: '50%',
      width: '400px',
      height: '300px',
    },
  }))
);

const GameCardEndModal = () => {
  const { gameState } = useCardGameState();
  const { takenTime } = useCardGameTimer();

  const handleClose = () => {
    location.reload();
  };

  return (
    <Modal open={gameState === 'END'}>
      <ModalPaper>
        <Typography
          textAlign='center'
          sx={(theme) => ({
            color:
              takenTime < GAME_TIME
                ? theme.palette.success.main
                : theme.palette.error.main,
            fontSize: '1.5rem',
            [theme.breakpoints.between('min', 'max')]: {
              fontSize: '1.8rem',
            },
            [theme.breakpoints.up('max')]: {
              fontSize: 'h2.fontSize',
            },
          })}
        >
          {takenTime < GAME_TIME ? 'Success' : 'Fail'}
        </Typography>
        <Typography
          textAlign='center'
          sx={(theme) => ({
            fontSize: '1rem',
            [theme.breakpoints.between('min', 'max')]: {
              fontSize: '1.2rem',
            },
            [theme.breakpoints.up('max')]: {
              fontSize: 'h4.fontSize',
            },
          })}
        >
          {takenTime < GAME_TIME
            ? `Score: ${takenTime.toFixed(2)}`
            : 'Time Over...'}
        </Typography>
        <Typography
          textAlign='center'
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            bottom: '0.2rem',
            fontSize: '0.5rem',
            left: '50%',
            transform: 'translate(-50%, 0)',
            color: theme.palette.primary.main,
            cursor: 'pointer',
            [theme.breakpoints.between('min', 'max')]: {
              fontSize: '0.8rem',
            },
            [theme.breakpoints.up('max')]: {
              fontSize: 'h6.fontSize',
              bottom: '1rem',
            },
          })}
        >
          Try Again
        </Typography>
      </ModalPaper>
    </Modal>
  );
};

export default React.memo(GameCardEndModal);
