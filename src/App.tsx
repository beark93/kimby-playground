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
            minHeight: '100vh',
            py: 2,
            [theme.breakpoints.up('max')]: {
              maxWidth: '600px',
              minHeight: '94vh',
            },
          })}
        >
          <GlobalStyles
            styles={(theme) => ({
              body: {
                height: '100vh',
                [theme.breakpoints.up('max')]: {
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
