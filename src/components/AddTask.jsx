import { useState } from 'react';
// my context
import { useDataDispatch } from './Context';

export default function AddTask({ listId, total }) {
  const dispatch = useDataDispatch();
  const [text, setText] = useState('');
  function handleAddTask() {
    setText('');
    dispatch({
      type: 'task_add',
      listId,
      text,
      total,
    });
  }
  return (
    <div className="task-add">
      <input
        type="text"
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) handleAddTask();
        }}
      />
      <button type="button" onClick={handleAddTask}>Add Task</button>
    </div>
  );
}
