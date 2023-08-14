import { useState } from 'react';
// my context
import { useDataDispatch } from './Context';
// my components
import Tasks from './Tasks';

export default function List({ list }) {
  const dispatch = useDataDispatch();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="list">
      <div className="list-header">
        {isEditing && (
          <>
            <input
              type="text"
              value={list.title}
              onChange={(e) => {
                dispatch({
                  type: 'list_change_title',
                  id: list.id,
                  title: e.target.value,
                });
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) setIsEditing(false);
              }}
            />
            <button type="button" onClick={() => setIsEditing(false)}>Done</button>
          </>
        )}
        {!isEditing && (
          <>
            <h2>{list.title}</h2>
            <button type="button" onClick={() => setIsEditing(true)}>Edit Title</button>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: 'list_delete',
              id: list.id,
            });
          }}
        >
          Delete List
        </button>
      </div>
      <Tasks tasks={list.tasks} listId={list.id} />
    </div>
  );
}
