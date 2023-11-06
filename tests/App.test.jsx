import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('App', () => {
  it('renders', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });
});

// describe('routing behavior', () => {
//   it('can navigate in and out of all lists as pages', () => {
//     render(<BrowserRouter><App /></BrowserRouter>);
//     const user = userEvent.setup();
//     const lists = screen.queryAllByRole('button', { name: 'Edit this list' });
//     lists.forEach(async (list) => {
//       await user.click(list);
//       await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
//     });
//   });
// });

// if the above code block is tested, then the following tests fail - investigate this

describe('functional behavior', () => {
  it('can change the title of a list', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    const editButton = screen.getByRole('button', { name: 'Change Title' });
    await user.click(editButton);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'awawa');
    const saveButton = screen.getByRole('button', { name: 'Save Title' });
    await user.click(saveButton);
    screen.getByRole('heading', { level: 2, name: 'awawa' });
  });

  it('can change the text of a task', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    const editButton = screen.queryAllByRole('button', { name: 'Change Text' })[0];
    await user.click(editButton);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'awawa');
    const saveButton = screen.getByRole('button', { name: 'Save Text' });
    await user.click(saveButton);
    screen.getByText('awawa');
  });
});
