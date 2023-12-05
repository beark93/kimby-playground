import React, { useEffect } from 'react';

import Routes from './routes';

import { CssBaseline, GlobalStyles, Container, Box } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

/**
 * breackpoint modify
 * xs, sm, md, lg, xl remove
 * mobile add (min: Galaxy Fold(280px), max: mobile(640px))
 */
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    zero: true;
    min: true;
    max: true;
  }
}

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Jua',
    },
    breakpoints: {
      values: {
        zero: 0,
        min: 280,
        max: 640,
      },
    },
  })
);

const App = () => {
  const mobileFullHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    mobileFullHeight();

    window.addEventListener('resize', mobileFullHeight);

    return () => {
      window.removeEventListener('resize', mobileFullHeight);
    };
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container
          maxWidth='max'
          sx={(theme) => ({
            position: 'relative',
            backgroundColor: '#fff',
            height: '100%',
            py: 2,
            [theme.breakpoints.up('max')]: {
              maxWidth: '600px',
              minHeight: '94vh',
              borderRadius: '15px',
            },
          })}
        >
          <GlobalStyles
            styles={(theme) => ({
              body: {
                height: 'calc(var(--var, 1vh) * 100)',
                [theme.breakpoints.up('max')]: {
                  height: '100vh',
                  background: 'url(/assets/image/background.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  overscrollBehaviorY: 'none',
                  padding: '3vh 0',
                },
              },
            })}
          />
          <Box
            sx={{
              width: '100%',
              display: 'inline-block',
              minWidth: '250px',
            }}
          >
            <Routes />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
