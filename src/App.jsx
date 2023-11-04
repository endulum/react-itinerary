import { useState } from 'react';
import defaultData from './defaultData';

export default function App() {
  const [data, setData] = useState(defaultData);
  return (
    <div>
      <h1>Itinerary</h1>
      {data.map((list) => (
        <section key={list.id}>
          <h2>{list.title}</h2>
          <ul>
            {list.tasks.map((task) => (
              <li key={task.id}>
                {`${task.text} ${task.done ? '(DONE)' : ''}`}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
