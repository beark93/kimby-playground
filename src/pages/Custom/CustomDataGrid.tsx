import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Grid, Box, Typography, Button } from '@mui/material';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import CustomDataGridList from '@components/Grid/CustomDataGridList';
import MiddleGrid from '@components/Grid/MiddleGrid';

const mokData = [
  {
    id: '1',
    code: 'BOX-001',
    state: '대기중',
    date: new Date(),
  },
  {
    id: '2',
    code: 'BOX-002',
    state: '대기중',
    date: new Date(),
  },
  {
    id: '3',
    code: 'BOX-003',
    state: '준비',
    date: new Date(),
  },
  {
    id: '4',
    code: 'BOX-004',
    state: '대기',
    date: new Date(),
  },
  {
    id: '5',
    code: 'BOX-005',
    state: '완료',
    date: new Date(),
  },
  {
    id: '6',
    code: 'BOX-006',
    state: '취소',
    date: new Date(),
  },
];

const CustomDataGrid = () => {
  const [data, setData] = useState(mokData);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const dataGridBoxRef = useRef<HTMLDivElement>();

  const onClickEdit = () => {
    setIsEdit((state) => !state);
  };

  const onDragStart = (id: string) => {
    if (!isEdit) return;
    setDragId(id);
  };

  const onDragEnd = () => {
    if (!isEdit) return;
    setDragId(null);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();

    if (!isEdit) return;

    setDragOverId(id);

    if (dragId && dragId !== id) {
      setData((state) => {
        const nonDragState = state.filter((it) => it.id !== dragId);
        const targetIndex = nonDragState.findIndex((it) => it.id === id);
        const front = nonDragState.slice(0, targetIndex);
        const end = nonDragState.slice(targetIndex);

        return [...front, state.filter((it) => it.id === dragId)[0], ...end];
      });
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isEdit) return;

    if (
      e.relatedTarget instanceof Element &&
      e.currentTarget.contains(e.relatedTarget)
    )
      return;

    if (dragId && dragId !== dragOverId) {
      setData((state) => {
        const nonDragState = state.filter((it) => it.id !== dragId);
        const targetIndex = nonDragState.findIndex(
          (it) => it.id === dragOverId
        );
        const front = nonDragState.slice(0, targetIndex + 1);
        const end = nonDragState.slice(targetIndex + 1);

        return [...front, state.filter((it) => it.id === dragId)[0], ...end];
      });
    }
  };

  const onTouchStart = (id: string) => {
    if (!isEdit) return;
    setDragId(id);
  };

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      if (!isEdit || !dataGridBoxRef.current) return;

      const nonDraggingLists = [
        ...dataGridBoxRef.current.querySelectorAll('.draggable'),
      ];

      const targetIndex = nonDraggingLists.reduce(
        (closest, child, index) => {
          const box = child.getBoundingClientRect();
          const offset = e.touches[0].clientY - box.top - box.height;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, idx: index };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY, idx: -1 }
      ).idx;

      if (dragId && targetIndex >= 0) {
        setData((state) => {
          const nonDragState = state.filter((it) => it.id !== dragId);
          const front = nonDragState.slice(0, targetIndex);
          const end = nonDragState.slice(targetIndex);

          return [...front, state.filter((it) => it.id === dragId)[0], ...end];
        });
      }
    },
    [dragId, isEdit]
  );

  const onTouchEnd = () => {
    if (!isEdit) return;
    setDragId(null);
  };

  useEffect(() => {
    if (isEdit && dragId) {
      document.addEventListener('touchmove', onTouchMove, {
        passive: false,
      });
    }
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, [isEdit, dragId, onTouchMove]);

  return (
    <>
      <BasicHeader>
        <MiddleTypography
          fontSize={{
            zero: '1.2rem',
            max: 'h4.fontSize',
          }}
        >
          Data Grid
        </MiddleTypography>
      </BasicHeader>
      <Grid container mb={1}>
        <MiddleGrid item zero={12} sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            color={isEdit ? 'success' : 'primary'}
            onClick={onClickEdit}
          >
            {isEdit ? '완료' : '편집'}
          </Button>
        </MiddleGrid>
      </Grid>
      <Grid
        container
        zero={12}
        onDragLeave={onDragLeave}
        sx={{ border: '2px solid black' }}
      >
        <Grid item container sx={{ borderBottom: '3px double black' }}>
          <MiddleGrid item zero={1}>
            <Typography>번호</Typography>
          </MiddleGrid>
          <MiddleGrid item zero={3}>
            <Typography>코드</Typography>
          </MiddleGrid>
          <MiddleGrid item zero={5}>
            <Typography>상태</Typography>
          </MiddleGrid>
          <MiddleGrid item zero={3}>
            <Typography>날짜</Typography>
          </MiddleGrid>
        </Grid>
        <Box
          width='100%'
          ref={dataGridBoxRef}
          sx={{ cursor: isEdit ? 'move' : 'default' }}
        >
          {data.map((it, idx) => (
            <CustomDataGridList
              key={`data-grid-list-${it.id}`}
              row={it}
              className={dragId === it.id ? 'draggable dragging' : 'draggable'}
              draggable={isEdit}
              testId={`custom-data-grid-list-${idx}`}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            />
          ))}
        </Box>
      </Grid>
    </>
  );
};

export default CustomDataGrid;
