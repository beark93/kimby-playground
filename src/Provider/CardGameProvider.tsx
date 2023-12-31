import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from 'react';

type Card = {
  flip: boolean;
  id: number;
};

type State = {
  cards: Card[];
  count: number;
  gameState: 'INIT' | 'VIEW' | 'CHOICE' | 'CHECK' | 'END';
};

type Timer = {
  viewTimer: number;
  gameTimer: number;
  takenTime: number;
};

type StateAction =
  | { type: 'PREVIEW_START' }
  | { type: 'PREVIEW_END' }
  | { type: 'CARD_CLICK'; index: number }
  | { type: 'CHECK_START' }
  | { type: 'CHECK_SUCCESS' }
  | { type: 'CHECK_FAIL'; index: number; preIndex: number }
  | { type: 'TIME_OVER' }
  | { type: 'END' };

type TimerAction =
  | { type: 'VIEW_TIMER' }
  | { type: 'GAME_TIMER' }
  | { type: 'TIME_OVER' }
  | { type: 'END' };

type Dispatch = {
  onGameStart: () => void;
  onFlip: (index: number) => void;
};

const CardGameStateContext = createContext<State | null>(null);
const CardGameTimerContext = createContext<Timer | null>(null);
const CardGameDispatchContext = createContext<Dispatch | null>(null);

// 게임 상태 Actions
const stateReducer: (state: State, action: StateAction) => State = (
  state: State,
  action: StateAction
) => {
  switch (action.type) {
    // 미리보기 시작
    case 'PREVIEW_START':
      return {
        ...state,
        cards: state.cards.map((it) => ({ ...it, flip: true })),
        gameState: 'VIEW',
      };
    // 미리보기 끝 / 게임 시작
    case 'PREVIEW_END':
      return {
        ...state,
        cards: state.cards.map((it) => ({ ...it, flip: false })),
        gameState: 'CHOICE',
      };
    // 카드 클릭
    case 'CARD_CLICK':
      return {
        ...state,
        cards: state.cards.map((it, idx) =>
          idx === action.index ? { ...it, flip: true } : it
        ),
      };
    // 카드 체크 (2장의 카드가 뒤집혔을 경우)
    case 'CHECK_START':
      return {
        ...state,
        gameState: 'CHECK',
      };
    // 동일한 카드가 뒤집혔을 경우
    case 'CHECK_SUCCESS':
      return {
        ...state,
        count: state.count + 1,
        gameState: 'CHOICE',
      };
    // 다른 카드가 뒤집혔을 경우
    case 'CHECK_FAIL':
      return {
        ...state,
        cards: state.cards.map((it, idx) =>
          idx === action.preIndex || idx === action.index
            ? { ...it, flip: false }
            : it
        ),
        gameState: 'CHOICE',
      };
    // 시간 종료
    case 'TIME_OVER':
      return {
        ...state,
        gameState: 'END',
      };
    // 게임 끝
    case 'END':
      return {
        cards: state.cards.map((it) => ({ id: it.id, flip: it.flip })),
        count: state.count + 1,
        gameState: 'END',
      };
  }
};

// 게임 타이머 Actions
const timerReducer: (timer: Timer, action: TimerAction) => Timer = (
  timer: Timer,
  action: TimerAction
) => {
  switch (action.type) {
    // 미리보기 타이머 시작
    case 'VIEW_TIMER':
      return {
        ...timer,
        viewTimer: timer.viewTimer - 1,
      };
    // 게임 타이머 시작
    case 'GAME_TIMER':
      return {
        ...timer,
        gameTimer: parseFloat((timer.gameTimer - 0.02).toFixed(2)),
      };
    // 시간 종료
    case 'TIME_OVER': {
      return {
        takenTime: GAME_TIME,
        viewTimer: 0,
        gameTimer: 0,
      };
    }
    // 게임 끝
    case 'END': {
      const takenTime = GAME_TIME - timer.gameTimer;
      return {
        ...timer,
        takenTime: takenTime,
      };
    }
  }
};

const shuffledCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8].sort(
  () => Math.random() - 0.5
);

const CardGameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, stateDispatch] = useReducer(stateReducer, {
    cards: shuffledCards.map((id) => ({ id, flip: false })),
    count: 0,
    gameState: 'INIT',
  });

  const [timer, timerDispatch] = useReducer(timerReducer, {
    viewTimer: 3,
    gameTimer: GAME_TIME,
    takenTime: 0,
  });

  const gameTimerInterval = useRef<number>();
  const viewTimerInterval = useRef<number>();
  const cardCheckTimeout = useRef<number>();
  const preIndex = useRef(-1);

  // 게임시작 버튼 클릭 시
  const onGameStart = useCallback(() => {
    if (state.gameState !== 'INIT') {
      return;
    }

    stateDispatch({ type: 'PREVIEW_START' });

    viewTimerInterval.current = setInterval(() => {
      timerDispatch({ type: 'VIEW_TIMER' });
    }, 1000);

    setTimeout(() => {
      stateDispatch({ type: 'PREVIEW_END' });
      clearInterval(viewTimerInterval.current);

      gameTimerInterval.current = setInterval(() => {
        timerDispatch({ type: 'GAME_TIMER' });
      }, 20);
    }, 3000);
  }, [state.gameState]);

  //  카드 클릭
  const onFlip = useCallback(
    (index: number) => {
      if (state.gameState !== 'CHOICE') {
        return;
      }

      if (state.cards[index].flip) {
        return;
      }

      stateDispatch({ type: 'CARD_CLICK', index });

      // 2장의 카드가 뒤집혔을 경우
      if (preIndex.current > -1) {
        stateDispatch({ type: 'CHECK_START' });
        if (state.cards[preIndex.current].id === state.cards[index].id) {
          if (state.count < 7) {
            stateDispatch({ type: 'CHECK_SUCCESS' });
          } else {
            if (cardCheckTimeout.current) {
              clearTimeout(cardCheckTimeout.current);
            }
            clearInterval(gameTimerInterval.current);
            stateDispatch({ type: 'END' });
            timerDispatch({ type: 'END' });
          }
          preIndex.current = -1;
        } else {
          cardCheckTimeout.current = setTimeout(() => {
            stateDispatch({
              type: 'CHECK_FAIL',
              index: index,
              preIndex: preIndex.current,
            });
            preIndex.current = -1;
          }, 500);
        }
      } else {
        preIndex.current = index;
      }
    },
    [state.cards, state.count, state.gameState]
  );

  useEffect(() => {
    if (timer.gameTimer <= 0.02) {
      if (cardCheckTimeout.current) {
        clearTimeout(cardCheckTimeout.current);
      }
      clearInterval(gameTimerInterval.current);
      stateDispatch({ type: 'TIME_OVER' });
      timerDispatch({ type: 'TIME_OVER' });
    }
  }, [timer.gameTimer]);

  const memoizedState = useMemo(() => state, [state]);
  const memoizedTimer = useMemo(() => timer, [timer]);
  const memoizedDispatch = useMemo(
    () => ({
      onGameStart,
      onFlip,
    }),
    [onFlip, onGameStart]
  );

  return (
    <CardGameStateContext.Provider value={memoizedState}>
      <CardGameTimerContext.Provider value={memoizedTimer}>
        <CardGameDispatchContext.Provider value={memoizedDispatch}>
          {children}
        </CardGameDispatchContext.Provider>
      </CardGameTimerContext.Provider>
    </CardGameStateContext.Provider>
  );
};

export default CardGameProvider;

export const GAME_TIME = 15;

export const useCardGameState = () => {
  const state = useContext(CardGameStateContext);
  if (!state) throw new Error('Not Initaling');
  return state;
};

export const useCardGameTimer = () => {
  const timer = useContext(CardGameTimerContext);
  if (!timer) throw new Error('Not Initaling');
  return timer;
};

export const useCardGameDispatch = () => {
  const dispatch = useContext(CardGameDispatchContext);
  if (!dispatch) throw new Error('Not Initaling');
  return dispatch;
};

export const useCard = (index: number) => {
  const { cards } = useCardGameState();
  const [card, setCard] = useState<Card>({ id: -1, flip: false });

  useEffect(() => {
    setCard(cards[index]);
  }, [index, cards]);

  return card;
};
