import { useRef, useCallback } from 'react';

const usePaddle = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  const paddleX = useRef<number | null>(null);

  const rightPress = useRef(false);
  const leftPress = useRef(false);

  const drawPaddle = useCallback(() => {
    if (!ctx || !canvas) return;

    const uniWidth = canvas.clientWidth / 100;
    const uniHeight = canvas.clientHeight / 100;

    const paddleWidth = uniWidth * 15;
    const paddleHeight = uniHeight * 3;

    if (!paddleX.current) {
      paddleX.current = (canvas.clientWidth - paddleWidth) / 2;
    }

    ctx.beginPath();
    ctx.rect(
      paddleX.current,
      canvas.clientHeight - paddleHeight,
      paddleWidth,
      paddleHeight
    );
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    if (
      rightPress.current &&
      paddleX.current < canvas.clientWidth - paddleWidth
    ) {
      paddleX.current += uniWidth;
    } else if (leftPress.current && paddleX.current > 0) {
      paddleX.current -= uniWidth;
    }
  }, [ctx, canvas]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      rightPress.current = true;
    } else if (e.keyCode === 37) {
      leftPress.current = true;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      rightPress.current = false;
    } else if (e.keyCode === 37) {
      leftPress.current = false;
    }
  }, []);

  return { paddleX, drawPaddle, handleKeyDown, handleKeyUp };
};

export default usePaddle;
