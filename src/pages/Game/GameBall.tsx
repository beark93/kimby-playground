import React, { useState, useEffect, useRef } from 'react';

import { Grid } from '@mui/material';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';

const GameBall = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      canvas.width = container.clientWidth * 0.9;
      canvas.height = container.clientWidth * 0.6;
      canvas.style.border = '2px solid black';

      const context = canvas.getContext('2d');
      if (context) {
        const uniWidth = canvas.width * 0.01;
        const uniHeight = canvas.height * 0.01;

        context.beginPath();
        context.rect(
          uniWidth * 4,
          uniHeight * 12,
          uniWidth * 10,
          uniHeight * 15
        );
        context.fillStyle = '#FF0000';
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(
          uniWidth * 50,
          uniHeight * 50,
          uniWidth * 4,
          0,
          Math.PI * 2,
          false
        );
        context.fillStyle = 'green';
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(
          uniWidth * 32,
          uniHeight * 3,
          uniWidth * 20,
          uniHeight * 12
        );
        context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        context.stroke();
        context.closePath();
      }
      // setCtx();
    }
  }, []);

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
