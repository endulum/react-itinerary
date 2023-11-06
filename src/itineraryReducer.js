export default function itineraryReducer(lists, action) {
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
