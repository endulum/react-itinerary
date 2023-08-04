import { useState } from 'react';

export default function Tasks({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li className="task" key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  let taskHTML;
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    taskHTML = (
      <>
        <input
          type="text"
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button type="button" onClick={() => setIsEditing(false)}>Done</button>
      </>
    );
  } else {
    taskHTML = (
      <>
        {task.text}
        <button type="button" onClick={() => setIsEditing(true)}>Edit Task</button>
      </>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => onChange({
          ...task,
          done: e.target.checked,
        })}
      />
      {taskHTML}
      <button type="button" onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
