import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import IconCard from '@components/Card/IconCard';

const HomeTitle = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    padding: '6vh 0',
    color: '#000',
    zIndex: '1',
    [theme.breakpoints.up('max')]: {
      padding: '10vh 0',
    },
    [theme.breakpoints.down('max')]: {
      '&::before': {
        content: '""',
        background: 'url(/assets/image/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.4',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        zIndex: '-1',
      },
    },
  }))
);

const Home = () => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    location.reload();
  };

  return (
    <>
      <HomeTitle>
        <Typography
          sx={(theme) => ({
            cursor: 'pointer',
            mb: '-30px',
            fontSize: '1.4rem',
            [theme.breakpoints.between('min', 'max')]: {
              mb: '-10vw',
              fontSize: '8vw',
            },
            [theme.breakpoints.up('max')]: {
              mb: '-35px',
              fontSize: '2rem',
            },
          })}
          fontFamily='Playpen Sans'
          onClick={onClickLogo}
        >
          B.Y Kim
        </Typography>
        <Typography
          sx={{
            cursor: 'pointer',
          }}
          fontSize={{ zero: '2.8rem', min: '16vw', max: '4rem' }}
          fontFamily='Playpen Sans'
          onClick={onClickLogo}
        >
          Playground
        </Typography>
      </HomeTitle>
      <Grid container spacing={2} columns={{ zero: 6, max: 12 }}>
        <Grid item zero={3}>
          <IconCard title='우버현황' onClick={() => navigate('/uber/list')} />
        </Grid>
        <Grid item zero={3}>
          <IconCard title='카드뒤집기' onClick={() => navigate('/game/card')} />
        </Grid>
        <Grid item zero={3}>
          <IconCard
            title='데이터그리드'
            onClick={() => navigate('/custom/data-grid')}
          />
        </Grid>
        <Grid item zero={3}>
          <IconCard
            title='포켓몬도감'
            onClick={() => navigate('/pokemon/list')}
          />
        </Grid>
        <Grid item zero={3}>
          <IconCard
            title='벽돌깨기'
            onClick={() => navigate('/game/break-out')}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
