import { useReducer, useState } from 'react';

import Tasks from './Tasks';
import AddTask from './AddTask';

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'add': return [...tasks, {
      id: action.id,
      text: action.text,
      done: false,
    }];

    case 'change': return tasks.map((task) => {
      if (task.id === action.task.id) return action.task;
      return task;
    });

    case 'delete': return tasks.filter((task) => task.id !== action.id);

    default: throw new Error(`Unknown action: ${action.type}`);
  }
};

export default function List({ list, onChange, onDelete }) {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, list.tasks);

  const handleAddTask = (text) => dispatchTasks({
    type: 'add',
    id: tasks.length + 1,
    text,
  });

  const handleChangeTask = (task) => dispatchTasks({
    type: 'change',
    task,
  });

  const handleDeleteTask = (taskId) => dispatchTasks({
    type: 'delete',
    id: taskId,
  });

  let titleHTML;
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    titleHTML = (
      <>
        <input
          type="text"
          value={list.title}
          onChange={(e) => {
            onChange({
              ...list,
              title: e.target.value,
            });
          }}
        />
        <button type="button" onClick={() => setIsEditing(false)}>Done</button>
      </>
    );
  } else {
    titleHTML = (
      <>
        <h2>{list.title}</h2>
        <button type="button" onClick={() => setIsEditing(true)}>Edit Title</button>
      </>
    );
  }

  return (
    <>
      {titleHTML}
      <button type="button" onClick={() => onDelete(list.id)}>Delete List</button>
      <br />
      <br />
      <div className="task-list">
        <AddTask onAddTask={handleAddTask} />
        <Tasks tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
      </div>
    </>
  );
}
