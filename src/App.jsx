import { useReducer } from 'react';
import './App.css';

import List from './components/List';
import AddList from './components/AddList';

const initialData = [
  {
    id: 0,
    title: 'First list',
    tasks: [
      { id: 0, text: 'First task of first list', done: false },
      { id: 1, text: 'Second task of first list', done: false },
      { id: 2, text: 'Third task of first list', done: false },
    ],
  }, {
    id: 2,
    title: 'Second list',
    tasks: [
      { id: 0, text: 'First task of second list', done: false },
      { id: 1, text: 'Second task of second list', done: false },
      { id: 2, text: 'Third task of second list', done: false },
    ],
  }, {
    id: 3,
    title: 'Third list',
    tasks: [
      { id: 0, text: 'First task of third list', done: false },
      { id: 1, text: 'Second task of third list', done: false },
      { id: 2, text: 'Third task of third list', done: false },
    ],
  },
];

const listsReducer = (lists, action) => {
  switch (action.type) {
    case 'add': return [...lists, {
      id: action.id,
      title: action.text,
      tasks: [],
    }];

    case 'change': return lists.map((list) => {
      if (list.id === action.list.id) return action.list;
      return list;
    });

    case 'delete': return lists.filter((list) => list.id !== action.id);

    case 'update': return action.lists;

    default: throw new Error(`Unknown action: ${action.type}`);
  }
};

export default function App() {
  const [lists, dispatchLists] = useReducer(listsReducer, initialData);

  const handleAddList = (text) => dispatchLists({
    type: 'add',
    id: lists.length + 1,
    text,
  });

  const handleChangelist = (list) => dispatchLists({
    type: 'change',
    list,
  });

  const handleDeleteList = (listId) => dispatchLists({
    type: 'delete',
    id: listId,
  });

  return (
    <>
      <h1>Itinerary</h1>
      <AddList onAddList={handleAddList} />
      {lists.map((list) => (
        <div className="list">
          <List
            key={list.id}
            list={list}
            onChange={handleChangelist}
            onDelete={handleDeleteList}
          />
        </div>
      ))}
    </>
  );
}
