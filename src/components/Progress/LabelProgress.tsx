import React from 'react';

import { Grid, LinearProgress, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

type PropsType = LinearProgressProps & {
  label: string;
};

const LabelProgress = ({ label, value, color }: PropsType) => {
  return (
    <Grid item zero={12}>
      <Typography
        sx={{
          fontSize: {
            zero: '0.8rem',
            max: 'h6.fontSize',
          },
        }}
        gutterBottom
      >
        <DoneIcon fontSize='inherit' color='inherit' />
        &nbsp;{label}
      </Typography>
      <LinearProgress
        sx={{ height: { zero: 20, max: 30 }, borderRadius: 5 }}
        variant='determinate'
        value={value}
        color={color}
      />
    </Grid>
  );
};

export default React.memo(LabelProgress);
