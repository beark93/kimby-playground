import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useCard, useCardGameDispatch } from 'src/Provider/CardGameProvider';

const StyledPaper = styled(Paper)`
  ${({ theme }) => `
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  transition: ${theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard,
  })};
  transform-style: preserve-3d;
  & .front, .back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .front {
    transform: rotateY(180deg);
  }
  &.flip {
    transform: rotateY(180deg);
  }
  `}
`;

type PropsType = {
  index: number;
};

const FlipPaper = ({ index }: PropsType) => {
  const { id, flip } = useCard(index);
  const { onFlip } = useCardGameDispatch();

  const onClick = () => {
    onFlip(index);
  };

  return (
    <Box
      sx={{
        perspective: '500px',
        width: '80%',
        height: { zero: '60px', min: '23vw', max: '140px' },
      }}
      onClick={onClick}
    >
      <StyledPaper className={flip ? 'flip' : ''}>
        <Paper className='front'>
          <Typography variant='h1'>{id}</Typography>
        </Paper>
        <Paper className='back' sx={{ backgroundColor: '#aaaaaa' }}></Paper>
      </StyledPaper>
    </Box>
  );
};

export default React.memo(FlipPaper);
