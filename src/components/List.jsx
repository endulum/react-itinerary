import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
// my context
import { useDataDispatch } from './Context';
// my components
import Tasks from './Tasks';

export default function List({ list }) {
  let listData;
  if (list) listData = list;

  else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const loaderData = useLoaderData().list;
    // eslint-disable-next-line prefer-destructuring
    listData = loaderData[0];
  }

  const dispatch = useDataDispatch();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="list">
      <div className="list-header">
        {isEditing && (
          <>
            <input
              type="text"
              value={listData.title}
              onChange={(e) => {
                dispatch({
                  type: 'list_change_title',
                  id: listData.id,
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
            <h2>{listData.title}</h2>
            <button type="button" onClick={() => setIsEditing(true)}>Edit Title</button>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: 'list_delete',
              id: listData.id,
            });
          }}
        >
          Delete List
        </button>
        <Link to={{
          pathname: `lists/${listData.id}`,
          query: {
            id: listData.id,
          },
        }}
        >
          View
        </Link>
      </div>
      <Tasks tasks={listData.tasks} listId={listData.id} />
    </div>
  );
}
