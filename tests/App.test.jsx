import { beforeEach, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import App from '../src/App';

beforeEach(() => {
  render(<BrowserRouter><App /></BrowserRouter>);
});

describe('routing behavior', () => {
  it('can navigate in and out of all lists as pages', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[1]);
    await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[2]);
    await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
  });
});

describe('functional behavior', () => {
  it('can change the title of a list', async () => {
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

  it('can delete a list', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    await user.click(screen.getByRole('button', { name: 'Delete this list' }));
    await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
  });

  it('can delete a task', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    await user.click(screen.queryAllByRole('button', { name: 'Delete' })[0]);
    await user.click(screen.getByRole('button', { name: 'Back to List Overview' }));
  });

  it('can add a list', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Add new list' }));
    screen.getByRole('heading', { level: 2, name: '(new list)' });
  });

  it('can add a task', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('button', { name: 'Edit this list' })[0]);
    await user.click(screen.getByRole('button', { name: 'Add a Task' }));
    screen.getByText('(new task)');
  });

  it('can complete a task', async () => {
    const user = userEvent.setup();
    await user.click(screen.queryAllByRole('checkbox')[0]);
    screen.getByRole('checkbox', { checked: true });
  });
});
