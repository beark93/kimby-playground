import Routes from './routes'

import { CssBaseline, GlobalStyles, Container, Box } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    zero: true; // adds the `mobile` breakpoint
    min: true;
    max: true;
  }
}

const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        zero: 0,
        min: 250,
        max: 600,
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
            py: {
              zero: 2,
              max: 6,
            },
          }}
        >
          <GlobalStyles styles={{ body: { backgroundColor: '#ececec' } }} />
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'inline-block',
              minWidth: '220px',
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
