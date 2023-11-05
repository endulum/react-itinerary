import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Task from './Task';
import { DispatchContext } from '../Context';

export default function List({
  list, isEditable,
}) {
  const [changing, setChanging] = useState(false);
  const dispatch = useContext(DispatchContext);
  function toggleChanging() { setChanging(!changing); }
  function handleEditListTitle(listId, title) {
    dispatch({
      type: 'edit_list_title',
      listId,
      title,
    });
  }
  return (
    <section key={list.id}>
      {changing ? (
        <div>
          <input
            type="text"
            defaultValue={list.title}
            onChange={(e) => {
              handleEditListTitle(list.id, e.target.value);
            }}
          />
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
            <Task
              listId={list.id}
              key={task.id}
              task={task}
              isEditable={isEditable}
            />
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
