import React from 'react';

import { Typography, Grid } from '@mui/material';
import { GridProps } from '@mui/material/Grid';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import MiddleGrid from '@components/grid/MiddleGrid';
import { getFormattedDate } from '@utils/common';

const DragGrid = React.memo(
  styled(Grid)<GridProps>(({ theme }) => ({
    borderBottom: '1px solid #aaaaaa',
    backgroundColor: '#ececec',
    height: '15.5px',
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
  }))
);

const CustomTypography = React.memo(
  styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: '0.8rem',
    [theme.breakpoints.between('min', 'max')]: {
      fontSize: '4vw',
    },
    [theme.breakpoints.up('max')]: {
      fontSize: '1rem',
    },
  }))
);

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
  onTouchStart: (id: string) => void;
  onTouchEnd: () => void;
};

const CustomDataGridList = ({
  row,
  className,
  draggable,
  testId,
  onDragStart,
  onDragEnd,
  onDragOver,
  onTouchStart,
  onTouchEnd,
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
      onTouchStart={() => onTouchStart(row.id)}
      onTouchEnd={onTouchEnd}
    >
      <MiddleGrid item zero={1}>
        <CustomTypography>{row.id}</CustomTypography>
      </MiddleGrid>
      <MiddleGrid item zero={3}>
        <CustomTypography>{row.code}</CustomTypography>
      </MiddleGrid>
      <MiddleGrid item zero={5}>
        <CustomTypography>{row.state}</CustomTypography>
      </MiddleGrid>
      <MiddleGrid item zero={3}>
        <CustomTypography>{getFormattedDate(row.date)}</CustomTypography>
      </MiddleGrid>
    </DragGrid>
  );
};

export default React.memo(CustomDataGridList);
