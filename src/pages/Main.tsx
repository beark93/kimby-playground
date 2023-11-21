import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import IconCard from '@components/card/IconCard';

const Main = () => {
  const navigate = useNavigate();

  return (
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
        <IconCard title='etc3' />
      </Grid>
    </Grid>
  );
};

export default Main;
