import { Grid, Skeleton, Typography } from '@mui/material';

const UberSkeleton = () => {
  return (
    <Grid item zero={12}>
      <Typography component='div' width='50%' variant='h6' gutterBottom>
        <Skeleton />
      </Typography>
      <Skeleton
        variant='rectangular'
        width='100%'
        sx={{ borderRadius: 5, height: { zero: 20, max: 30 } }}
      />
    </Grid>
  );
};

export default UberSkeleton;
