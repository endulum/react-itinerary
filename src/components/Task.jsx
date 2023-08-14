import { useState } from 'react';
// my context
import { useDataDispatch } from './Context';

export default function Task({ task, listId }) {
  const dispatch = useDataDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const labelId = `${listId}-${task.id}`;
  return (
    <li className="task">
      <input
        type="checkbox"
        id={labelId}
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'task_toggle',
            listId,
            taskId: task.id,
            done: e.target.checked,
          });
        }}
      />
      {isEditing && (
        <>
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              dispatch({
                type: 'task_change_text',
                listId,
                taskId: task.id,
                text: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) setIsEditing(false);
            }}
          />
          <button type="button" onClick={() => setIsEditing(false)}>Done</button>
        </>
      )}
      {!isEditing && (
        <>
          <label htmlFor={labelId}>{task.text}</label>
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: 'task_delete',
            listId,
            taskId: task.id,
          });
        }}
      >
        Delete
      </button>
    </li>
  );
}
