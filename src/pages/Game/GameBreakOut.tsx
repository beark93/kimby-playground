import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Grid } from '@mui/material';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import GameStartModal from '@components/Modal/GameStartModal';
import GameEndModal from '@components/Modal/GameEndModal';

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

  const drawBricks = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    if (scoreRef.current === 15) {
      setState('SUCCESS');
    }

    const uniWidth = canvasRef.current.clientWidth / 100;
    const uniHeight = canvasRef.current.clientHeight / 100;

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

  const onClickStart = useCallback(() => {
    setState('START');
    drawInterval.current = setInterval(draw, 10);
  }, [draw]);

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
      <GameStartModal open={state === 'READY'} handleStart={onClickStart} />
      <GameEndModal state={state} />
    </>
  );
};

export default GameBreakOut;
