import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
    screen.debug();
  });
});