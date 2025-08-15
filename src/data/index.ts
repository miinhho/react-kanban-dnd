import type { Column } from "../types";

export const initialData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Plan project', description: 'Create initial project structure' },
      { id: '2', title: 'Design UI', description: 'Create wireframes and mockups' },
    ]
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Implement features', description: 'Start coding the main features' },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', title: 'Setup project', description: 'Initialize React and dependencies' },
    ]
  }
];

export const ItemType = 'TASK';