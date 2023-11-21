import React from 'react';

import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import MiddleTypography from '@components/Typography/MiddleTypography';

type PropsType = {
  onClick: () => void;
};

const BackButton = ({ onClick }: PropsType) => {
  return (
    <IconButton color='inherit' onClick={onClick}>
      <MiddleTypography>
        <ArrowBackIosNewIcon
          sx={{
            fontSize: {
              zero: '1rem',
              max: '1.5rem',
            },
          }}
        />
      </MiddleTypography>
    </IconButton>
  );
};

export default React.memo(BackButton);
