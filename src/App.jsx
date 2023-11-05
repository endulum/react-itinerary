import { useState } from 'react';
import {
  Routes, Route, Outlet, Navigate, Link,
} from 'react-router-dom';
import defaultData from './defaultData';
import List from './itinerary-components/List';
import Overview from './itinerary-components/Overview';

export default function App() {
  const [lists, setLists] = useState(defaultData);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview lists={lists} />} />
        {lists.map((list) => (
          <Route
            key={list.id}
            path={`/list/${list.id}`}
            element={(
              <>
                <List
                  list={list}
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
