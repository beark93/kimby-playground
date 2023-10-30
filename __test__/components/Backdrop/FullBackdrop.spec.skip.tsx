import React from 'react';
import { render, screen } from '@testing-library/react';

import FullBackdrop from '../../../src/components/Backdrop/FullBackdrop';

describe('FullBackdrop Component Test', () => {
  it('backdrop unvisible test', () => {
    render(<FullBackdrop open={false}>Test</FullBackdrop>);
    const text = screen.getByText('Test');

    const style = window.getComputedStyle(text);
    expect(style.visibility).toBe('hidden');
  });

  it('backdrop visible test', () => {
    render(<FullBackdrop open={false}>Test</FullBackdrop>);
    const text = screen.getByText('Test');

    const style = window.getComputedStyle(text);
    expect(style.visibility).toBe('hidden');
  });
});
