import { useState } from 'react';

export default function AddList({ onAddList }) {
  const [text, setText] = useState('');
  return (
    <>
      <input type="text" placeholder="Add list" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          setText('');
          onAddList(text);
        }}
      >
        Add List
      </button>
    </>
  );
}
