// my components
import Task from './Task';
import AddTask from './AddTask';

export default function Tasks({ tasks, listId }) {
  return (
    <div className="tasks">
      <AddTask listId={listId} total={tasks.length} />
      <ul className="task-list">
        {tasks.map((task) => <Task key={task.id} task={task} listId={listId} />)}
      </ul>
    </div>
  );
}
