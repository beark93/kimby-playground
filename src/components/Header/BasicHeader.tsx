import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import BackButton from '@components/Buuton/BackButton';
import MiddleGrid from '@components/Grid/MiddleGrid';

type PropsType = {
  children: React.ReactNode;
  right?: React.ReactNode;
};

const BasicHeader = ({ children, right }: PropsType) => {
  const navigate = useNavigate();

  const onClickGoBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Grid container spacing={0} sx={{ zero: 12, max: 12, mb: 5 }}>
      <MiddleGrid item zero={1} max={1.5}>
        <BackButton onClick={onClickGoBack} />
      </MiddleGrid>
      <Grid item zero={10} max={9}>
        {children}
      </Grid>
      <MiddleGrid item zero={1} max={1.5}>
        {right}
      </MiddleGrid>
    </Grid>
  );
};

export default BasicHeader;
