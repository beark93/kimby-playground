import React from 'react';

import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledStack = React.memo(
  styled(Stack)<StackProps>(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }))
);

const MiddleStack = (props: StackProps) => {
  return <StyledStack {...props} />;
};

export default React.memo(MiddleStack);
