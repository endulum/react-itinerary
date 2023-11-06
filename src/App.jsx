import { useReducer } from 'react';
import {
  Routes, Route, Outlet, Link,
} from 'react-router-dom';

import Lists from './itinerary-components/Lists';
import List from './itinerary-components/List';
import { DispatchContext } from './Context';
import itineraryReducer from './itineraryReducer';
import defaultData from './defaultData';

export default function App() {
  const [lists, dispatch] = useReducer(itineraryReducer, defaultData);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Routes>
        <Route element={<Layout />}>
          {/* home route */}
          <Route
            index
            element={(
              <Lists lists={lists} />
            )}
          />

          {/* route for each list */}
          {lists.map((list) => (
            <Route
              key={list.id}
              path={`/list/${list.id}`}
              element={(
                <>
                  <List list={list} isEditable />
                  <Link to="/">
                    <button type="button">Back to List Overview</button>
                  </Link>
                </>
                )}
            />
          ))}

          {/* catchall route */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </DispatchContext.Provider>
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
      <p>No list found at this URL.</p>
      <Link to="/">
        <button type="button">Back to List Overview</button>
      </Link>
    </>
  );
}
