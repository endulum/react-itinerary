import { v4 as uuid } from 'uuid';

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

    case 'delete_list':
      return [...lists.filter((list) => list.id !== action.listId)];

    case 'delete_task':
      return [...lists.map((list) => {
        if (list.id === action.listId) {
          return {
            ...list,
            tasks: [...list.tasks.filter((task) => task.id !== action.taskId)],
          };
        } return list;
      })];

    case 'add_list':
      return [...lists, {
        id: uuid(),
        title: '(new list)',
        tasks: [],
      }];

    case 'add_task':
      return [...lists.map((list) => {
        if (list.id === action.listId) {
          return {
            ...list,
            tasks: [...list.tasks, {
              id: uuid(),
              text: '(new task)',
              done: false,
            }],
          };
        } return list;
      })];

    case 'toggle_task':
      return [...lists.map((list) => {
        if (list.id === action.listId) {
          return {
            ...list,
            tasks: [...list.tasks.map((task) => {
              if (task.id === action.taskId) return { ...task, done: action.done };
              return task;
            })],
          };
        } return list;
      })];

    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
