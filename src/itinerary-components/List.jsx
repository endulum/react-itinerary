import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import { useDispatch } from '../Context';

export default function List({ list, isEditable }) {
  const [changing, setChanging] = useState(false);
  function toggleChanging() { setChanging(!changing); }

  const dispatch = useDispatch();

  function handleEditListTitle(title) {
    dispatch({
      type: 'edit_list_title',
      listId: list.id,
      title,
    });
  }

  function handleDeleteList() {
    dispatch({
      type: 'delete_list',
      listId: list.id,
    });
  }

  function handleAddTask() {
    dispatch({
      type: 'add_task',
      listId: list.id,
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
              handleEditListTitle(e.target.value);
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

      {list.tasks.length > 0 ? (
        <ul>
          {list.tasks.map((task) => (
            <Task
              key={task.id}
              listId={list.id}
              task={task}
              isEditable={isEditable}
            />
          ))}
        </ul>
      ) : (
        <p>No Tasks</p>
      )}

      {isEditable && (
        <div>
          <button type="button" onClick={handleAddTask}>Add a Task</button>
          <button type="button" onClick={handleDeleteList}>Delete this list</button>
        </div>
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
