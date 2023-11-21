import React from 'react';

import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import MiddleTypography from '@components/Typography/MiddleTypography';

type PropsType = {
  onClick: () => void;
};

const RefreshButton = ({ onClick }: PropsType) => {
  return (
    <IconButton color='inherit' onClick={onClick}>
      <MiddleTypography>
        <RefreshIcon
          sx={{
            fontSize: {
              zero: '1.2rem',
              max: '1.8rem',
            },
          }}
        />
      </MiddleTypography>
    </IconButton>
  );
};

export default React.memo(RefreshButton);
