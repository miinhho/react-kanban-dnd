export type Task = {
  id: string
  title: string
  description: string
}

export type Column = {
  id: ColumnId
  title: string
  tasks: Task[]
}

export type ColumnId = 'todo' | 'inProgress' | 'done'
