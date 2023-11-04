import { v4 as uuid } from 'uuid';

const defaultData = [
  {
    id: uuid(),
    title: 'Title of List A',
    tasks: [
      {
        id: uuid(),
        text: 'Task 1 of List A',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 2 of List A',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 3 of List A',
        done: false,
      },
    ],
  }, {
    id: uuid(),
    title: 'Title of List B',
    tasks: [
      {
        id: uuid(),
        text: 'Task 1 of List B',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 2 of List B',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 3 of List B',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 4 of List B',
        done: false,
      },
    ],
  }, {
    id: uuid(),
    title: 'Title of List C',
    tasks: [
      {
        id: uuid(),
        text: 'Task 1 of List C',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 2 of List C',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 3 of List C',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 4 of List C',
        done: false,
      }, {
        id: uuid(),
        text: 'Task 5 of List C',
        done: false,
      },
    ],
  },
];

export default defaultData;
