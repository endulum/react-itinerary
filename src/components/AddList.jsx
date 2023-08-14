import { useState } from 'react';
// my context
import { useDataDispatch } from './Context';

export default function AddList() {
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
