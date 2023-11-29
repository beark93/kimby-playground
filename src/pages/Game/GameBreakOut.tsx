import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Grid } from '@mui/material';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import GameBreakOutStartModal from '@components/Modal/GameBreakOutStartModal';
import GameBreakOutEndModal from '@components/Modal/GameBreakOutEndModal';

import useBall from '@hooks/useBall';
import usePaddle from '@hooks/usePaddle';

const defaultBricks = [
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
  ],
  [
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
    { x: 0, y: 0, status: 1 },
  ],
];

const GameBreakOut = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [state, setState] = useState('READY');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawInterval = useRef<number>();

  const bricksRef = useRef(defaultBricks);
  const scoreRef = useRef(0);

  const { x, y, drawBall, boundPaddle } = useBall(ctx, canvasRef.current);
  const { paddleX, drawPaddle, handleKeyDown, handleKeyUp } = usePaddle(
    ctx,
    canvasRef.current
  );

  // 벽돌 그리기
  const drawBricks = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    if (scoreRef.current === 15) {
      setState('SUCCESS');
    }

    const uniWidth = canvasRef.current.clientWidth / 100;
    const uniHeight = canvasRef.current.clientHeight / 100;

    // 벽돌 크기 및 배치 기본값 설정
    const brickWidth = uniWidth * 15;
    const brickHeight = uniHeight * 6;
    const brickPadding = uniWidth * 3;
    const brickOffsetTop = uniHeight * 9;
    const brickOffsetLeft = uniWidth * 6;

    bricksRef.current.forEach((row, xIdx) => {
      row.forEach((it, yIdx) => {
        if (it.x <= 0 || it.y <= 0) {
          const brickX = xIdx * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = yIdx * (brickHeight + brickPadding) + brickOffsetTop;

          it.x = brickX;
          it.y = brickY;
        }

        if (it.status) {
          ctx.beginPath();
          ctx.rect(it.x, it.y, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      });
    });
  }, [ctx]);

  // 공이 Paddle 에 닿았는지 바닥에 닿았는지 판단하는 function
  const touchPaddleDetection = useCallback(
    (x: number | null, y: number | null, paddleX: number | null) => {
      if (!ctx || !canvasRef.current) return;

      const uniWidth = canvasRef.current.clientWidth / 100;

      const paddleWidth = uniWidth * 15;

      if (y && y > canvasRef.current.clientHeight - uniWidth) {
        if (x && paddleX && x >= paddleX && x <= paddleX + paddleWidth) {
          boundPaddle();
        } else {
          setState('OVER');
        }
      }
    },
    [ctx, boundPaddle]
  );

  // 공이 벽돌에 맞았는지 판단하는 function
  const collisionDetection = useCallback(
    (x: number | null, y: number | null) => {
      if (!ctx || !canvasRef.current) return;

      const uniWidth = canvasRef.current.clientWidth / 100;
      const uniHeight = canvasRef.current.clientHeight / 100;

      const brickWidth = uniWidth * 15;
      const brickHeight = uniHeight * 6;

      bricksRef.current.forEach((row) => {
        row.forEach((it) => {
          if (!x || !y || !it.status) return;

          if (
            x > it.x &&
            x < it.x + brickWidth &&
            y > it.y &&
            y < it.y + brickHeight
          ) {
            boundPaddle();
            it.status = 0;
            scoreRef.current++;
          }
        });
      });
    },
    [ctx, boundPaddle]
  );

  // 공, Paddle, 벽돌을 cavas 에 그리는 function
  const draw = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawBricks();
    drawBall();
    drawPaddle();

    touchPaddleDetection(x.current, y.current, paddleX.current);
    collisionDetection(x.current, y.current);
  }, [
    ctx,
    x,
    y,
    paddleX,
    drawBricks,
    drawBall,
    drawPaddle,
    touchPaddleDetection,
    collisionDetection,
  ]);

  // 게임 시작 (draw func 10ms 마다 실행)
  const onClickStart = useCallback(() => {
    setState('START');
    drawInterval.current = setInterval(draw, 10);
  }, [draw]);

  // 페이지 접근 시 canvas 그리기
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      canvas.width = container.clientWidth * 0.9;
      canvas.height = container.clientWidth * 0.6;
      canvas.style.border = '2px solid black';

      const context = canvas.getContext('2d');
      setCtx(context);
    }
  }, []);

  // 키보드 좌우 입력 EventListener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('keyup', handleKeyUp, false);
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (state === 'OVER' || state === 'SUCCESS') {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('keyup', handleKeyUp, false);

      if (drawInterval.current) {
        clearInterval(drawInterval.current);
      }
    }
  }, [handleKeyDown, handleKeyUp, state]);

  return (
    <>
      <BasicHeader>
        <MiddleTypography
          fontSize={{
            zero: '1.2rem',
            max: 'h4.fontSize',
          }}
        >
          벽돌깨기 게임
        </MiddleTypography>
      </BasicHeader>
      <Grid
        container
        ref={containerRef}
        flex='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        width='100%'
        height='100%'
      >
        <canvas ref={canvasRef}></canvas>
      </Grid>
      <GameBreakOutStartModal
        open={state === 'READY'}
        handleStart={onClickStart}
      />
      <GameBreakOutEndModal state={state} />
    </>
  );
};

export default GameBreakOut;
