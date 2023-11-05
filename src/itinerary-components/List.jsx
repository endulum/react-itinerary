import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

export default function List({ list, isEditable }) {
  const [changing, setChanging] = useState(false);
  function toggleChanging() { setChanging(!changing); }

  return (
    <section key={list.id}>
      {changing ? (
        <div>
          <input type="text" defaultValue={list.title} />
          <button type="button" onClick={toggleChanging}>Save Title</button>
        </div>

      ) : (
        <div>
          <h2>{list.title}</h2>
          {isEditable && <button type="button" onClick={toggleChanging}>Change Title</button>}
        </div>
      )}

      {list.tasks.length > 0 && (
        <ul>
          {list.tasks.map((task) => (
            <Task key={task.id} task={task} isEditable={isEditable} />
          ))}
        </ul>
      )}
    </section>
  );
}

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
    })),
  }).isRequired,
  isEditable: PropTypes.bool,
};

List.defaultProps = {
  isEditable: true,
};
