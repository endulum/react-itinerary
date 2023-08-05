import { useState } from 'react';
import context from './Context';

export default function Tasks({ tasks, listId }) {
  return (
    <div className="tasks">
      <AddTask listId={listId} total={tasks.length} />
      <ul>
        {tasks.map((task) => <Task key={task.id} task={task} listId={listId} />)}
      </ul>
    </div>
  );
}

function Task({ task, listId }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <context.Consumer>
      {(value) => {
        const { dispatchLists } = value;
        const labelId = `${listId}-${task.id}`;
        return (
          <li>
            <input
              type="checkbox"
              id={labelId}
              checked={task.done}
              onChange={(e) => {
                dispatchLists({
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
                  dispatchLists({
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
                dispatchLists({
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
      }}
    </context.Consumer>
  );
}

function AddTask({ listId, total }) {
  const [text, setText] = useState('');
  return (
    <context.Consumer>
      {(value) => {
        const { dispatchLists } = value;
        const handleAddTask = () => {
          setText('');
          dispatchLists({
            type: 'task_add', listId, text, total,
          });
        };
        return (
          <div>
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
      }}
    </context.Consumer>
  );
}

// gyrad/multi-todo
