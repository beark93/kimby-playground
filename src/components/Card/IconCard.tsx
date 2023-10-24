import React from 'react';

import {
  Card,
  CardContent,
  CardActionArea,
  Paper,
  Typography,
} from '@mui/material';
import { PaperProps } from '@mui/material/Paper/Paper';
import { styled } from '@mui/material/styles';

type PropsType = {
  title: string;
  background: string;
  onClick?: () => void;
};

const IconPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  width: '100px',
  height: '100px',
  [theme.breakpoints.down('max')]: {
    width: '85px',
    height: '85px',
  },
  mb: 1,
}));

const IconCard = ({ title, background, onClick }: PropsType) => {
  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <IconPaper sx={{ backgroundColor: background }} />
          <Typography
            fontSize={{
              max: '1rem',
            }}
            color='inherit'
            textAlign='center'
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(IconCard);
