import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DataProvider } from './components/Context';

import Lists from './components/Lists';
import List from './components/List';

const getList = (id) => {
  const data = JSON.parse(localStorage.getItem('data'));
  const found = data.filter((list) => list.id === id);
  return found;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lists />,
  }, {
    path: 'lists/:listId',
    element: <List />,
    loader: ({ params }) => {
      const list = getList(params.listId);
      return { list };
    },
  },
]);

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}
