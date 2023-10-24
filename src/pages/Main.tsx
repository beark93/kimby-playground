import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import IconCard from '@components/Card/IconCard';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={4}
      direction={{ zero: 'column', max: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      useFlexGap
      flexWrap='wrap'
    >
      <IconCard
        title='uberdia'
        background='#00aa00'
        onClick={() => navigate('/uber/list')}
      />
      <IconCard
        title='socket'
        background='#aa0000'
        onClick={() => navigate('/socket/test')}
      />
      <IconCard
        title='card-game'
        background='#0000aa'
        onClick={() => navigate('/game/card')}
      />
      <IconCard title='test4' background='#aa00aa' />
    </Stack>
  );
};

export default Main;
