/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import {
  createContext, useReducer, useEffect, useContext,
} from 'react';
import { v4 as uuid } from 'uuid';

const DataContext = createContext();
const DataDispatchContext = createContext();

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

const dataReducer = (lists, action) => {
  switch (action.type) {
    //
    // list reducers
    case 'list_add': return [
      ...lists,
      {
        id: uuid().toString(),
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
              id: uuid().toString(),
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

export function DataProvider({ children }) {
  const localData = JSON.parse(localStorage.getItem('data'));
  const [data, dispatchData] = useReducer(dataReducer, localData || initialLists);
  useEffect(() => { localStorage.setItem('data', JSON.stringify(data)); }, [data]);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatchData}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() { return useContext(DataContext); }
export function useDataDispatch() { return useContext(DataDispatchContext); }

// gyrad/multi-todo
// react.dev/learn/scaling-up-with-reducer-and-context
