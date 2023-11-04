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
    expect(screen.getByText('Task 1 of List A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change Text' })).toBeInTheDocument();
  });

  it('should render an input and a button when button to edit task is clicked', async () => {
    render(<Task task={dummy} />);
    const user = userEvent.setup();

    const button1 = screen.getByRole('button', { name: 'Change Text' });
    await user.click(button1);
    expect(screen.getByRole('textbox', { value: 'Task 1 of List A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Text' })).toBeInTheDocument();

    const button2 = screen.getByRole('button', { name: 'Save Text' });
    await user.click(button2);
    expect(screen.getByText('Task 1 of List A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change Text' })).toBeInTheDocument();
  });
});