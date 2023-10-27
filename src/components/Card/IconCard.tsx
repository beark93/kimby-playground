import React from 'react';

import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';

type PropsType = {
  title: string;
  onClick?: () => void;
};

const StyledCard = styled(Card)<CardProps>(() => ({
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  boxShadow: 'none',
}));

const IconCard = ({ title, onClick }: PropsType) => {
  return (
    <StyledCard>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 0, textAlign: 'center', lineHeight: 0 }}>
          <FolderTwoToneIcon
            sx={{ fontSize: { zero: '4rem', min: '25vw', max: '6rem' } }}
          />
          <Typography
            fontSize={{ zero: '0.8rem', min: '4vw', max: '1rem' }}
            color='inherit'
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default React.memo(IconCard);
