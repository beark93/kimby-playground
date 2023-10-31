import React from 'react';

import { Typography, Grid } from '@mui/material';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import MiddleGrid from '@components/Grid/MiddleGrid';
import { getFormattedDate } from '@utils/common';

const DragGrid = styled(Grid)<GridProps>(({ theme }) => ({
  borderBottom: '1px solid #aaaaaa',
  backgroundColor: '#ececec',
  height: '15.5px',
  cursor: 'move',
  [theme.breakpoints.between('min', 'max')]: {
    height: '7vw',
  },
  [theme.breakpoints.up('max')]: {
    height: '35px',
  },
  ':last-child': {
    borderBottom: 'none',
  },
  '&.dragging': {
    opacity: '.5',
    border: '2px dashed red',
  },
}));

type PropsType = {
  row: {
    id: string;
    code: string;
    state: string;
    date: Date;
  };
  className: string;
  draggable: boolean;
  testId: string;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
};

const CustomDataGridList = ({
  row,
  className,
  draggable,
  testId,
  onDragStart,
  onDragEnd,
  onDragOver,
}: PropsType) => {
  return (
    <DragGrid
      item
      container
      zero={12}
      data-testid={testId}
      role='draggable'
      draggable={draggable}
      className={className}
      onDragStart={() => onDragStart(row.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, row.id)}
    >
      <MiddleGrid item zero={1}>
        <Typography>{row.id}</Typography>
      </MiddleGrid>
      <MiddleGrid item zero={3}>
        <Typography>{row.code}</Typography>
      </MiddleGrid>
      <MiddleGrid item zero={5}>
        <Typography>{row.state}</Typography>
      </MiddleGrid>
      <MiddleGrid item zero={3}>
        <Typography>{getFormattedDate(row.date)}</Typography>
      </MiddleGrid>
    </DragGrid>
  );
};

export default CustomDataGridList;
