import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from '../src/itinerary-components/Task';

describe('Task render', async () => {
  const dummy = {
    id: '1',
    text: 'Task 1 of List A',
    done: false,
  };

  it('should render a span and a button to edit the text', () => {
    render(<Task task={dummy} />);
    screen.getByText('Task 1 of List A');
    screen.getByRole('button', { name: 'Change Text' });
  });

  it('should render an input and a button when button to edit task is clicked', async () => {
    render(<Task task={dummy} />);
    const user = userEvent.setup();

    const button1 = screen.getByRole('button', { name: 'Change Text' });
    await user.click(button1);
    screen.getByRole('textbox', { value: 'Task 1 of List A' });
    screen.getByRole('button', { name: 'Save Text' });
    expect(() => screen.getByText('Task 1 of List A')).toThrow();
    expect(() => screen.getByRole('button', { name: 'Change Text' })).toThrow();

    const button2 = screen.getByRole('button', { name: 'Save Text' });
    await user.click(button2);
    screen.getByText('Task 1 of List A');
    screen.getByRole('button', { name: 'Change Text' });
    expect(() => screen.getByRole('textbox', { value: 'Task 1 of List A' })).toThrow();
    expect(() => screen.getByRole('button', { name: 'Save Text' })).toThrow();
  });
});
