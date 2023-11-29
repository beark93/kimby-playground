import { useRef, useCallback } from 'react';

const useBall = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  /**
   * x: 공의 x축 좌표
   * y: 공의 y축 좌표
   * dx: 공의 x축 이동 방향 (+: right, -: left)
   * dy: 공의 y축 이동 방향 (+: up, -: down)
   */
  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);
  const dx = useRef(1);
  const dy = useRef(-1);

  // 공을 그리는 function
  const drawBall = useCallback(() => {
    if (!ctx || !canvas) return;

    const uniWidth = canvas.clientWidth / 100;
    const uniHeight = canvas.clientHeight / 100;

    // 최초 공 위치
    if (!x.current || !y.current) {
      x.current = canvas.clientWidth / 2;
      y.current = canvas.clientHeight - uniHeight * 9;
    }

    ctx.beginPath();
    ctx.arc(x.current, y.current, uniWidth * 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // 다음 번 공 위치 셋팅
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

  // 공이 paddle 에 닿았을 경우 다음 공 이동방향 변경
  const boundPaddle = useCallback(() => {
    dy.current = -1 * dy.current;
  }, []);

  return { x, y, drawBall, boundPaddle };
};

export default useBall;
