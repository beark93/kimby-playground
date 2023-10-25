import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import IconCard from '@components/Card/IconCard';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} columns={{ zero: 6, max: 12 }}>
      <Grid item zero={3}>
        <IconCard title='uberdia' onClick={() => navigate('/uber/list')} />
      </Grid>
      <Grid item zero={3}>
        <IconCard title='card-game' onClick={() => navigate('/game/card')} />
      </Grid>
      <Grid item zero={3}>
        <IconCard title='etc1' />
      </Grid>
      <Grid item zero={3}>
        <IconCard title='etc2' />
      </Grid>
      <Grid item zero={3}>
        <IconCard title='etc3' />
      </Grid>
    </Grid>
  );
};

export default Main;
