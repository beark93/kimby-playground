import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Grid, Box, Typography, Button } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import RefreshButton from '@components/Buuton/RefeshButton';
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

const CustomTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.8rem',
  [theme.breakpoints.between('min', 'max')]: {
    fontSize: '4vw',
  },
  [theme.breakpoints.up('max')]: {
    fontSize: '1rem',
  },
}));

const CustomDataGrid = () => {
  const [data, setData] = useState(mokData);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const dataGridBoxRef = useRef<HTMLDivElement>();

  const onClickRefesh = useCallback(() => {
    location.reload();
  }, []);

  // 편집 버튼 클릭
  const onClickEdit = () => {
    setIsEdit((state) => !state);
  };

  // Drag 이벤트 핸들러
  const onDragStart = (id: string) => {
    if (!isEdit) return;

    //  드래그 시작 시 현재 드래그 중인 id 저장
    setDragId(id);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();

    if (!isEdit) return;

    // onDragLeave 시 마지막 오버 id를 확인하기 위한 state
    setDragOverId(id);

    if (dragId && dragId !== id) {
      setData((state) => {
        // 현재 마우스 위치(targetIndex)에 드래그 중인 요소(dragId) 넣기
        // splice 사용 시 원본배열 변경으로 slice 사용
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

    // DataGrid 내부에서 Leave 이벤트 발생 시 무시
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

  const onDragEnd = () => {
    if (!isEdit) return;

    // 드래그 끝나면 state 초기화
    setDragId(null);
    setDragOverId(null);
  };

  // 터치 이벤트 핸들러
  const onTouchStart = (id: string) => {
    if (!isEdit) return;

    //  터치 시작 시 현재 드래그 중인 id 저장
    setDragId(id);
  };

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      if (!isEdit || !dataGridBoxRef.current) return;

      const draggableLists = [
        ...dataGridBoxRef.current.querySelectorAll('.draggable'),
      ];

      // 터치중인 위치의 요소 index 찾기
      const targetIndex = draggableLists.reduce(
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

    // 터치 끝나면 state 초기화
    setDragId(null);
  };

  // touchmove 이벤트 리스터 제어 > react onTouchMove 사용 시 화면 스크롤링 문제로 passive 옵션을 주기위해 addEventListener 사용
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
      <BasicHeader right={<RefreshButton onClick={onClickRefesh} />}>
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
            <CustomTypography>{isEdit ? '완료' : '편집'}</CustomTypography>
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
            <CustomTypography>번호</CustomTypography>
          </MiddleGrid>
          <MiddleGrid item zero={3}>
            <CustomTypography>코드</CustomTypography>
          </MiddleGrid>
          <MiddleGrid item zero={5}>
            <CustomTypography>상태</CustomTypography>
          </MiddleGrid>
          <MiddleGrid item zero={3}>
            <CustomTypography>날짜</CustomTypography>
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
