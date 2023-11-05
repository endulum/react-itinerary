import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App';

describe('App', () => {
  it('renders', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    screen.debug();
  });
});
