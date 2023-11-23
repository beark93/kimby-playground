import { useRef, useCallback } from 'react';

const useBall = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);
  const dx = useRef(1);
  const dy = useRef(-1);

  const drawBall = useCallback(() => {
    if (!ctx || !canvas) return;

    const uniWidth = canvas.clientWidth / 100;
    const uniHeight = canvas.clientHeight / 100;

    if (!x.current || !y.current) {
      x.current = canvas.clientWidth / 2;
      y.current = canvas.clientHeight - uniHeight * 9;
    }

    ctx.beginPath();
    ctx.arc(x.current, y.current, uniWidth * 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    if (
      x.current + dx.current * uniWidth * 0.4 < uniWidth ||
      x.current + dx.current * uniWidth * 0.4 > canvas.clientWidth - uniWidth
    ) {
      dx.current = -1 * dx.current;
    }

    if (y.current + dy.current * uniWidth * 0.4 < uniWidth) {
      dy.current = -1 * dy.current;
    }

    x.current += dx.current * uniWidth * 0.4;
    y.current += dy.current * uniWidth * 0.4;
  }, [ctx, canvas]);

  const boundPaddle = useCallback(() => {
    dy.current = -1 * dy.current;
  }, []);

  return { x, y, drawBall, boundPaddle };
};

export default useBall;
