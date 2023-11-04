import PropTypes from 'prop-types';

export default function Task({ task }) {
  return (
    <li>
      {`${task.text} ${task.done ? '(DONE)' : ''}`}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
};
