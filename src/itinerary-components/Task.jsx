import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Task({ task, isEditable }) {
  const [changing, setChanging] = useState(false);
  function toggleChanging() { setChanging(!changing); }

  return changing ? (
    <li>
      <input type="text" defaultValue={task.text} />
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
