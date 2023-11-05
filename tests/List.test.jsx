import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from '../src/itinerary-components/List';

describe('List render', async () => {
  const dummy = {
    id: '1',
    title: 'Title of List A',
    tasks: [
      {
        id: '1',
        text: 'Task 1 of List A',
        done: false,
      }, {
        id: '2',
        text: 'Task 2 of List A',
        done: false,
      }, {
        id: '3',
        text: 'Task 3 of List A',
        done: false,
      },
    ],
  };

  it('should render a heading, button to change title, and unordered list of tasks', () => {
    render(<List list={dummy} />);
    screen.getByRole('heading', { name: 'Title of List A' });
    screen.getByRole('button', { name: 'Change Title' });
    screen.getByRole('list');
  });

  it('should not render the unordered list if there are no tasks', () => {
    render(<List list={{
      id: '1',
      title: 'Title of List A',
      tasks: [],
    }}
    />);
    screen.getByRole('heading', { name: 'Title of List A' });
    screen.getByRole('button', { name: 'Change Title' });
    expect(() => screen.getByRole('list')).toThrow();
  });

  it('should render a textbox and button when button to change title is clicked', async () => {
    render(<List list={dummy} />);
    const user = userEvent.setup();

    const button1 = screen.getByRole('button', { name: 'Change Title' });
    await user.click(button1);
    screen.getByRole('textbox', { value: 'Title of List A' });
    screen.getByRole('button', { name: 'Save Title' });
    expect(() => screen.getByRole('heading', { name: 'Title of List A' })).toThrow();
    expect(() => screen.getByRole('button', { name: 'Change Title' })).toThrow();

    const button2 = screen.getByRole('button', { name: 'Save Title' });
    await user.click(button2);
    screen.getByRole('heading', { name: 'Title of List A' });
    screen.getByRole('button', { name: 'Change Title' });
    expect(() => screen.getByRole('textbox', { value: 'Title of List A' })).toThrow();
    expect(() => screen.getByRole('button', { name: 'Save Title' })).toThrow();
  });
});
