import PropTypes from 'prop-types';
import Task from './Task';

export default function List({ list }) {
  return (
    <section key={list.id}>
      <h2>{list.title}</h2>
      <ul>
        {list.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
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
};
