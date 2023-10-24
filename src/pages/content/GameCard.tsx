import React from 'react';

import { Typography, Stack, Button, Modal, Paper } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import FullBackdrop from '@components/Backdrop/FullBackdrop';
import FlipPaper from '@components/Paper/FlipPaper';

import {
  GAME_TIME,
  useCardGameState,
  useCardGameTimer,
  useCardGameDispatch,
} from '@components/Provider/CardGameProvider';

const BackDropTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
  [theme.breakpoints.down('max')]: {
    fontSize: '2rem',
  },
}));

const ModalPaper = styled(Paper)<PaperProps>(({ theme }) => ({
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
}));

const GameCard = () => {
  const { cards, gameState } = useCardGameState();
  const { viewTimer, gameTimer, takenTime } = useCardGameTimer();
  const { onGameStart } = useCardGameDispatch();

  const isStart = !(
    gameState === 'INIT' ||
    gameState === 'VIEW' ||
    gameState === 'END'
  );

  const handleClose = () => {
    location.reload();
  };

  return (
    <>
      <BasicHeader>
        <MiddleTypography variant='h6'>Card Game</MiddleTypography>
      </BasicHeader>
      <Typography
        align='center'
        sx={{
          fontSize: {
            zero: '1.2rem',
            max: 'h4.fontSize',
          },
        }}
        gutterBottom
      >
        {gameTimer.toFixed(2)}
      </Typography>
      <Stack
        position='relative'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        useFlexGap
        flexWrap='wrap'
        p={{ zero: 1, max: 4 }}
        spacing={{ zero: 1, max: 2 }}
      >
        <FullBackdrop open={!isStart}>
          {gameState === 'INIT' ? (
            <Button onClick={onGameStart} sx={{ color: '#fff' }}>
              <BackDropTypography>시작</BackDropTypography>
            </Button>
          ) : gameState === 'VIEW' ? (
            <BackDropTypography>{viewTimer}</BackDropTypography>
          ) : gameState === 'END' ? (
            <BackDropTypography>THE END</BackDropTypography>
          ) : (
            ''
          )}
        </FullBackdrop>
        {cards.map((_, index) => (
          <FlipPaper key={`card-${index}`} index={index} />
        ))}
      </Stack>
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
            {takenTime < GAME_TIME ? `Score: ${takenTime}` : 'Time Over...'}
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
    </>
  );
};

export default React.memo(GameCard);
