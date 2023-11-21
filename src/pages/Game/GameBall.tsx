import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Grid } from '@mui/material';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';

const GameBall = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);

  const drawBall = useCallback(() => {
    if (!ctx || !canvasRef.current || !x.current || !y.current) return;

    const uniWidth = canvasRef.current.clientWidth / 100;

    ctx.beginPath();
    ctx.arc(x.current, y.current, uniWidth * 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }, [ctx]);

  const draw = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    const uniWidth = canvasRef.current.clientWidth / 100;
    const uniHeight = canvasRef.current.clientHeight / 100;

    if (!x.current || !y.current) {
      x.current = canvasRef.current.clientWidth / 2;
      y.current = canvasRef.current.clientHeight - uniHeight * 9;
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawBall();
    x.current += uniWidth * 0.4;
    y.current += -uniWidth * 0.4;
  }, [ctx, drawBall]);

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

    setInterval(draw, 10);
  }, [draw]);

  return (
    <>
      <BasicHeader>
        <MiddleTypography
          fontSize={{
            zero: '1.2rem',
            max: 'h4.fontSize',
          }}
        >
          공튀기기 게임
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
    </>
  );
};

export default GameBall;
