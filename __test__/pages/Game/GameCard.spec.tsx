import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardGameProvider from '../../../src/Provider/CardGameProvider';
import GameCard from '../../../src/pages/Game/GameCard';

afterEach(() => {
  jest.useRealTimers();
});

describe('Game Card Page Test', () => {
  jest.useFakeTimers();

  it('game start & end after 15sec test', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <CardGameProvider>
            <GameCard />
          </CardGameProvider>
        </BrowserRouter>
      );
    });

    const timer = screen.getByText('15.00');
    const text = screen.getByText('시작');

    fireEvent.click(text);

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('시작')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(17000);
    });
    expect(timer).toHaveTextContent('0.00');

    const pop = screen.queryByText('Fail');
    expect(pop).not.toBeNull();
  });
});
