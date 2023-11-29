import React from 'react';

import { Typography, Grid, Button } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import FullBackdrop from '@components/Backdrop/FullBackdrop';
import MiddleGrid from '@components/Grid/MiddleGrid';
import FlipPaper from '@components/Paper/FlipPaper';
import GameCardEndModal from '@components/Modal/GameCardEndModal';

import {
  useCardGameState,
  useCardGameTimer,
  useCardGameDispatch,
} from 'src/Provider/CardGameProvider';

const BackDropTypography = React.memo(
  styled(Typography)<TypographyProps>(({ theme }) => ({
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

/*============================== Header ==============================*/
const Header = () => {
  return (
    <BasicHeader>
      <MiddleTypography
        fontSize={{
          zero: '1.2rem',
          max: 'h4.fontSize',
        }}
      >
        Card Game
      </MiddleTypography>
    </BasicHeader>
  );
};
const MemoizedHeader = React.memo(Header);

/*============================== Timer ==============================*/
const GameTimer = () => {
  const { gameTimer } = useCardGameTimer();

  return (
    <Typography
      align='center'
      fontSize={{
        zero: '1.2rem',
        max: 'h4.fontSize',
      }}
      gutterBottom
    >
      {gameTimer.toFixed(2)}
    </Typography>
  );
};
const MemoizedGameTimer = React.memo(GameTimer);

/*============================== Card Area ==============================*/
// 카드영역 Backdrop
const CardBackdrop = () => {
  const { gameState } = useCardGameState();
  const { viewTimer } = useCardGameTimer();
  const { onGameStart } = useCardGameDispatch();

  const isStart = !(
    gameState === 'INIT' ||
    gameState === 'VIEW' ||
    gameState === 'END'
  );

  return (
    <FullBackdrop open={!isStart}>
      {gameState === 'INIT' ? (
        <Button onClick={onGameStart} variant='contained'>
          <BackDropTypography>Start</BackDropTypography>
        </Button>
      ) : gameState === 'VIEW' ? (
        <BackDropTypography>{viewTimer}</BackDropTypography>
      ) : gameState === 'END' ? (
        <BackDropTypography>THE END</BackDropTypography>
      ) : (
        ''
      )}
    </FullBackdrop>
  );
};
const MemoizedCardBackdrop = React.memo(CardBackdrop);

// 카드 개별 Grid
const CardGrid = ({ index }: { index: number }) => {
  return (
    <MiddleGrid item zero={3}>
      <FlipPaper index={index} />
    </MiddleGrid>
  );
};
const MemoizedCardGrid = React.memo(CardGrid);

// 카드영역 전체 Grid
const CardAreaGrid = () => {
  const { cards } = useCardGameState();

  return (
    <Grid
      container
      rowSpacing={2}
      position='relative'
      p={{ zero: 1, max: 4 }}
      zero={12}
    >
      <MemoizedCardBackdrop />
      {cards.map((_, index) => (
        <MemoizedCardGrid key={`card-${index}`} index={index} />
      ))}
    </Grid>
  );
};
const MemoizedCardAreaGrid = React.memo(CardAreaGrid);

const GameCard = () => {
  return (
    <>
      <MemoizedHeader />
      <MemoizedGameTimer />
      <MemoizedCardAreaGrid />
      <GameCardEndModal />
    </>
  );
};

export default GameCard;
