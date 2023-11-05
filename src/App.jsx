import { useReducer } from 'react';
import {
  Routes, Route, Outlet, Link,
} from 'react-router-dom';
import defaultData from './defaultData';
import List from './itinerary-components/List';
import Overview from './itinerary-components/Overview';

export default function App() {
  function itineraryReducer(lists, action) {
    switch (action.type) {
      case 'edit_list_title':
        return [...lists.map((list) => {
          if (list.id === action.listId) return { ...list, title: action.title };
          return list;
        })];
      case 'edit_task_text':
        return [...lists.map((list) => {
          if (list.id === action.listId) {
            return {
              ...list,
              tasks: [...list.tasks.map((task) => {
                if (task.id === action.taskId) return { ...task, text: action.text };
                return task;
              })],
            };
          } return list;
        })];
      default:
        throw new Error(`Unknown action tyoe ${action.type}`);
    }
  }
  const [lists, dispatch] = useReducer(itineraryReducer, defaultData);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={(
            <Overview
              lists={lists}
              dispatch={dispatch}
            />
          )}
        />
        {lists.map((list) => (
          <Route
            key={list.id}
            path={`/list/${list.id}`}
            element={(
              <>
                <List
                  list={list}
                  dispatch={dispatch}
                  isEditable
                />
                <Link to="/">
                  <button type="button">Overview</button>
                </Link>
              </>
            )}
          />
        ))}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <h1>Itinerary</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function NoMatch() {
  return (
    <>
      <p>Uh oh! You friccin moron. You just got NO MATCHED!</p>
      <Link to="/">
        <button type="button">Click here to totally go home.</button>
      </Link>
    </>
  );
}
