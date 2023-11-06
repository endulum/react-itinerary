import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from '../Context';

export default function Task({ listId, task, isEditable }) {
  const [changing, setChanging] = useState(false);
  function toggleChanging() { setChanging(!changing); }

  const dispatch = useDispatch();

  function handleEditTaskText(e) {
    dispatch({
      type: 'edit_task_text',
      listId,
      taskId: task.id,
      text: e.target.value,
    });
  }

  function handleDeleteTask() {
    dispatch({
      type: 'delete_task',
      listId,
      taskId: task.id,
    });
  }

  function handleToggleTask(e) {
    dispatch({
      type: 'toggle_task',
      listId,
      taskId: task.id,
      done: e.target.checked,
    });
  }

  return (
    <li>
      {changing ? (
        <>
          <input
            type="text"
            defaultValue={task.text}
            onChange={handleEditTaskText}
          />
          <button type="button" onClick={toggleChanging}>Save Text</button>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input type="checkbox" checked={task.done} onChange={handleToggleTask} />
            {task.text}
          </label>
          {isEditable && (
            <>
              <button type="button" onClick={toggleChanging}>Change Text</button>
              <button type="button" onClick={handleDeleteTask}>Delete</button>
            </>
          ) }
        </>
      )}
    </li>
  );
}

Task.propTypes = {
  listId: PropTypes.string.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
  isEditable: PropTypes.bool,
};

Task.defaultProps = {
  isEditable: true,
};
