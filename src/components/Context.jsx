/* eslint-disable no-param-reassign */
import { createContext, useReducer, useEffect } from 'react';

const Context = createContext();

const initialLists = [
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
    //
    // list reducers
    case 'list_add': return [
      ...lists,
      {
        id: lists.length + 1,
        title: action.title,
        tasks: [],
      },
    ];

    case 'list_delete': return lists.filter((list) => list.id !== action.id);

    case 'list_change_title': return [
      ...lists.map((list) => {
        if (list.id === action.id) list.title = action.title;
        return list;
      }),
    ];

    //
    // task reducers
    case 'task_toggle': return [
      ...lists.map((list) => {
        if (list.id === action.listId) {
          list.tasks.map((task) => {
            if (task.id === action.taskId) {
              task.done = action.done;
            }
            return task;
          });
        }
        return list;
      }),
    ];

    case 'task_add': return [
      ...lists.map((list) => {
        if (list.id === action.listId) {
          if (action.total === list.tasks.length) {
            list.tasks = [...list.tasks, {
              id: list.tasks.length + 1,
              text: action.text,
              done: false,
            }];
          }
        }
        return list;
      }),
    ];

    case 'task_delete': return [
      ...lists.map((list) => {
        if (list.id === action.listId) {
          list.tasks = list.tasks.filter((task) => task.id !== action.taskId);
        }
        return list;
      }),
    ];

    case 'task_change_text': return [
      ...lists.map((list) => {
        if (list.id === action.listId) {
          list.tasks.map((task) => {
            if (task.id === action.taskId) {
              task.text = action.text;
            }
            return task;
          });
        }
        return list;
      }),
    ];

    default: throw Error(`Unknown action: ${action.type}`);
  }
};

const localLists = JSON.parse(localStorage.getItem('lists'));

function Provider({ children }) {
  const [lists, dispatchLists] = useReducer(listsReducer, localLists || initialLists);
  useEffect(() => {
    console.log(lists);
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ lists, dispatchLists }}>
      {children}
    </Context.Provider>
  );
}

const { Consumer } = Context;

const context = { Provider, Consumer };

export default context;
