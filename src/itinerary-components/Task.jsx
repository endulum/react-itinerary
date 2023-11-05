import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Task({
  listId, task, isEditable, dispatch,
}) {
  const [changing, setChanging] = useState(false);
  function toggleChanging() { setChanging(!changing); }
  function handleEditTaskText(listId, taskId, text) {
    dispatch({
      type: 'edit_task_text',
      listId,
      taskId,
      text,
    });
  }

  return changing ? (
    <li>
      <input
        type="text"
        defaultValue={task.text}
        onChange={(e) => {
          handleEditTaskText(listId, task.id, e.target.value);
        }}
      />
      <button type="button" onClick={toggleChanging}>Save Text</button>
    </li>
  ) : (
    <li>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>{task.text}</label>
      {isEditable && <button type="button" onClick={toggleChanging}>Change Text</button>}
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
  dispatch: PropTypes.func.isRequired,
  // onEditTaskText: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

Task.defaultProps = {
  isEditable: true,
};
