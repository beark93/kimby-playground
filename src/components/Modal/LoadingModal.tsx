import React from 'react';

import { Box, Modal, CircularProgress } from '@mui/material';

type PropsType = {
  open: boolean;
};

const LoadingModal = ({ open }: PropsType) => {
  return (
    <Modal disableAutoFocus={true} open={open}>
      <Box
        sx={{
          position: 'absolute' as const,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          sx={{
            color: '#fff',
          }}
        />
      </Box>
    </Modal>
  );
};

export default React.memo(LoadingModal);
