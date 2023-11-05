import { useState } from 'react';
import {
  Routes, Route, Outlet, Navigate, Link,
} from 'react-router-dom';
import defaultData from './defaultData';
import List from './itinerary-components/List';
import Overview from './itinerary-components/Overview';

export default function App() {
  const [lists, setLists] = useState(defaultData);

  function handleEditListTitle(listId, title) {
    setLists([...lists.map((list) => {
      if (list.id === listId) return { ...list, title };
      return list;
    })]);
  }

  function handleEditTaskText(listId, taskId, text) {
    setLists([...lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: [...list.tasks.map((task) => {
            if (task.id === taskId) return { ...task, text };
            return task;
          })],
        };
      } return list;
    })]);
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={(
            <Overview
              lists={lists}
              onEditListTitle={handleEditListTitle}
              onEditTaskText={handleEditTaskText}
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
                  onEditListTitle={handleEditListTitle}
                  onEditTaskText={handleEditTaskText}
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
