// my context
import { useData } from './Context';
// my components
import List from './List';
import AddList from './AddList';

export default function Lists() {
  const data = useData();
  return (
    <div className="lists">
      <AddList />
      {data.map((list) => <List key={list.id} list={list} />)}
    </div>
  );
}
