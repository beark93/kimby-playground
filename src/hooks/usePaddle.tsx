import { useRef, useCallback } from 'react';

const usePaddle = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  /**
   * paddleX: paddle의 x축 좌표
   * rightPress: 키보드 우 방향키 활성화 여부
   * leftPress: 키보드 좌 방향키 활성화 여부
   */
  const paddleX = useRef<number | null>(null);

  const rightPress = useRef(false);
  const leftPress = useRef(false);

  // paddle 그리는 function
  const drawPaddle = useCallback(() => {
    if (!ctx || !canvas) return;

    const uniWidth = canvas.clientWidth / 100;
    const uniHeight = canvas.clientHeight / 100;

    const paddleWidth = uniWidth * 15;
    const paddleHeight = uniHeight * 3;

    // 최초 paddle 위치
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

    // 다음 paddle 위치 미리셋팅
    if (
      rightPress.current &&
      paddleX.current < canvas.clientWidth - paddleWidth
    ) {
      paddleX.current += uniWidth;
    } else if (leftPress.current && paddleX.current > 0) {
      paddleX.current -= uniWidth;
    }
  }, [ctx, canvas]);

  // 키보드 좌우 버튼 클릭 시 paddle 이동을 위한 function
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
