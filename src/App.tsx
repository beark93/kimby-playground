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
          sx={{
            backgroundColor: '#fff',
            height: '100%',
            minHeight: '100vh',
            py: 2,
          }}
        >
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: '#ececec',
                'overscroll-behavior-y': 'none',
              },
            }}
          />
          <Box
            sx={{
              width: '100%',
              height: '100%',
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
