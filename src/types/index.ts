export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export type ColumnId = "todo" | "inProgress" | "done";
