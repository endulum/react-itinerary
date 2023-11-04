import { useState } from 'react';
import defaultData from './defaultData';
import List from './itinerary-components/List';

export default function App() {
  const [data, setData] = useState(defaultData);
  return (
    <div>
      <h1>Itinerary</h1>
      {data.map((list) => <List key={list.id} list={list} />)}
    </div>
  );
}
