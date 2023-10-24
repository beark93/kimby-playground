import React from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';

import MiddleStack from '@components/Stack/MiddleStack';

const MiddleTypography = (props: TypographyProps) => {
  return (
    <MiddleStack>
      <Typography variant={props.variant}>{props.children}</Typography>
    </MiddleStack>
  );
};

export default React.memo(MiddleTypography);
