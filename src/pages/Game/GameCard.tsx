import React from 'react';

import { Typography, Grid, Button } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import MiddleGrid from '@components/Grid/MiddleGrid';
import FullBackdrop from '@components/Backdrop/FullBackdrop';
import FlipPaper from '@components/Paper/FlipPaper';
import GameCardEndModal from '@components/Modal/GameCardEndModal';

import {
  useCardGameState,
  useCardGameTimer,
  useCardGameDispatch,
} from 'src/Provider/CardGameProvider';

const BackDropTypography = React.memo(
  styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: theme.typography.h1.fontSize,
    [theme.breakpoints.down('max')]: {
      fontSize: '2rem',
    },
  }))
);

const GameCard = () => {
  const { cards, gameState } = useCardGameState();
  const { viewTimer, gameTimer } = useCardGameTimer();
  const { onGameStart } = useCardGameDispatch();

  const isStart = !(
    gameState === 'INIT' ||
    gameState === 'VIEW' ||
    gameState === 'END'
  );

  return (
    <>
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
      <Grid
        container
        rowSpacing={2}
        position='relative'
        p={{ zero: 1, max: 4 }}
        zero={12}
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
          <MiddleGrid item key={`card-${index}`} zero={3}>
            <FlipPaper index={index} />
          </MiddleGrid>
        ))}
      </Grid>
      <GameCardEndModal />
    </>
  );
};

export default GameCard;
