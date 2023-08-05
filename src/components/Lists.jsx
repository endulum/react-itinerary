// import { useState } from 'react';
import { useState } from 'react';
import context from './Context';
import Tasks from './Tasks';

export default function Lists() {
  return (
    <context.Consumer>
      {(value) => {
        const { lists } = value;
        return (
          <div className="lists">
            <AddList />
            {lists.map((list) => (
              <List key={list.id} list={list} />
            ))}
          </div>
        );
      }}
    </context.Consumer>
  );
}

function List({ list }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <context.Consumer>
      {(value) => {
        const { dispatchLists } = value;
        return (
          <div className="list">
            {isEditing && (
              <>
                <input
                  type="text"
                  value={list.title}
                  onChange={(e) => {
                    dispatchLists({
                      type: 'list_change_title',
                      id: list.id,
                      title: e.target.value,
                    });
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
                dispatchLists({
                  type: 'list_delete',
                  id: list.id,
                });
              }}
            >
              Delete List
            </button>
            <Tasks tasks={list.tasks} listId={list.id} />
          </div>
        );
      }}
    </context.Consumer>
  );
}

function AddList() {
  const [text, setText] = useState('');
  return (
    <context.Consumer>
      {(value) => {
        const { dispatchLists } = value;
        return (
          <>
            <input type="text" placeholder="Add list" value={text} onChange={(e) => setText(e.target.value)} />
            <button
              type="button"
              onClick={() => {
                setText('');
                dispatchLists({
                  type: 'list_add',
                  title: text,
                });
              }}
            >
              Add List
            </button>
          </>
        );
      }}
    </context.Consumer>
  );
}
