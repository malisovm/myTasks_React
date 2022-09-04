import { ITask, ITaskType } from '../../interfaces'

export const savedTaskTypes: ITaskType[] = [
  {
    _id: '6302b72a5f570dcf1c3460b7',
    column: 1,
    text: 'Saved task type 1',
    __v: 0,
    tasks: []
  },
  {
    _id: '6302b7775f570dcf1c3460c9',
    column: 2,
    text: 'Saved task type 2',
    tasks: []
  },
]

export const savedTasks: ITask[] = [
  {
    _id: '6302b72a5f570dcf1c3460b9',
    column: 1,
    row: 1,
    text: 'Это Kanban-доска, написанная для тренировки на чистом JS',
    color: '#ffffff',
  },
  {
    _id: '6302b73f5f570dcf1c3460bd',
    column: 1,
    row: 2,
    text: 'Можно создавать и удалять задачи, а также добавлять и удалять колонки',
    color: '#ffffff',
  },
  {
    _id: '6302b74f5f570dcf1c3460c0',
    column: 1,
    row: 3,
    text: 'Задачи можно таскать между колонками',
    color: '#ffffff',
  },
  {
    _id: '6302b75e5f570dcf1c3460c6',
    column: 1,
    row: 4,
    text: 'Бекэнд на node.js сохраняет текст, расположение задач и цвета в mongodb',
    color: '#ffffff',
  },
  {
    _id: '6302b7775f570dcf1c3460cb',
    column: 2,
    row: 1,
    text: 'У задач можно менять цвет (у самого приложения кстати тоже)',
    color: '#edf038',
  },
  {
    _id: '6302b7815f570dcf1c3460ce',
    column: 2,
    row: 2,
    text: 'Работает на десктопных браузерах, на смартфонах нет',
    color: '#ffffff',
  },
]
