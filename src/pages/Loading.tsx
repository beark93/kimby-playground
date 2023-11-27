import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <CircularProgress
      sx={{
        color: '#bababa',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Loading;
