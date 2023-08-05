import { useState } from 'react';
import { useData, useDataDispatch } from './Context';
import Tasks from './Tasks';

export default function Lists() {
  const data = useData();
  return (
    <div className="lists">
      <AddList />
      {data.map((list) => <List key={list.id} list={list} />)}
    </div>
  );
}

function List({ list }) {
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

function AddList() {
  const dispatch = useDataDispatch();
  const [text, setText] = useState('');
  function handleAddList() {
    setText('');
    dispatch({
      type: 'list_add',
      title: text,
    });
  }
  return (
    <div className="list-add">
      <input
        type="text"
        placeholder="Add list"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) handleAddList();
        }}
      />
      <button
        type="button"
        onClick={() => handleAddList()}
      >
        Add List
      </button>
    </div>
  );
}
