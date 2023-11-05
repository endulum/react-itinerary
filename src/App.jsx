import { useState } from 'react';
import {
  Routes, Route, Outlet, Navigate, Link,
} from 'react-router-dom';
import defaultData from './defaultData';
import List from './itinerary-components/List';

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
              <List
                list={list}
                isEditable
              />
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

function Overview({ lists }) {
  return (
    <>
      {lists.map((list) => (
        <div key={list.id}>
          <List list={list} isEditable={false} />
          <Link to={`/list/${list.id}`}>
            <button type="button">Edit this list</button>
          </Link>
        </div>
      ))}
      <br />
      <Link to="/bad">
        <button type="button">Click here to 404!</button>
      </Link>
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
