import React from 'react';

import { Backdrop } from '@mui/material';

type PropsType = {
  children?: React.ReactNode;
  open: boolean;
};

const FullBackdrop = ({ children, open }: PropsType) => {
  return (
    <Backdrop
      open={open}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: '#fff',
        zIndex: 1,
      }}
    >
      {children}
    </Backdrop>
  );
};

export default React.memo(FullBackdrop);
