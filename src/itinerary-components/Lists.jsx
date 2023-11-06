import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from './List';

export default function Lists({ lists }) {
  return (
    <div>
      {lists.length > 0 ? lists.map((list) => (
        <div key={list.id}>
          <List list={list} isEditable={false} />
          <Link to={`/list/${list.id}`}>
            <button type="button">Edit this list</button>
          </Link>
        </div>
      )) : (
        <p>
          No lists.
        </p>
      )}
    </div>
  );
}

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
    })),
  })).isRequired,
};
