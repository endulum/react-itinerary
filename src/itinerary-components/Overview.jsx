import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from './List';

export default function Overview({ lists, dispatch }) {
  return (
    <>
      {lists.length > 0 ? lists.map((list) => (
        <div key={list.id}>
          <List
            list={list}
            isEditable={false}
            dispatch={dispatch}
            // onEditListTitle={onEditListTitle}
            // onEditTaskText={onEditTaskText}
          />
          <Link to={`/list/${list.id}`}>
            <button type="button">Edit this list</button>
          </Link>
        </div>
      )) : (
        <p>
          No lists...
        </p>
      )}
      <br />
      <Link to="/bad">
        <button type="button">Click here to 404!</button>
      </Link>
    </>
  );
}

Overview.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
    })),
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};
