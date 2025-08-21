import { find, findIndex, reject, some } from 'es-toolkit/compat'
import { produce } from 'immer'
import { use } from 'react'
import { TaskContext } from '../context/TaskContext'
import { type Column, type Task } from '../types'
import { useColumn } from './useColumn'

const useTaskContext = () => {
  const ctx = use(TaskContext)
  if (!ctx) {
    throw new Error('useTask must be used within a TaskContext')
  }
  return ctx
}

export const useTask = () => {
  const { columns, setColumns } = useTaskContext()
  const { selectedColumn } = useColumn()

  const findTaskColumn = (taskId: string): string | null => {
    const col = find(columns, (c) => some(c.tasks, { id: taskId }))
    return col ? col.id : null
  }

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
    if (fromColumnId === toColumnId) return

    setColumns((prev) =>
      produce(prev, (draft) => {
        const from = find(draft, { id: fromColumnId }) as Column
        const to = find(draft, { id: toColumnId }) as Column
        if (!from || !to) return

        const idx = findIndex(from.tasks, { id: taskId })
        if (idx === -1) return

        const [task] = from.tasks.splice(idx, 1)
        to.tasks.push(task)
      }),
    )
  }

  const onTaskMove = (taskId: string, toColumnId: string) => {
    const actualFromColumn = findTaskColumn(taskId)
    if (actualFromColumn) {
      moveTask(taskId, actualFromColumn, toColumnId)
    }
  }

  const addTask = (task: Task) => {
    setColumns((prev) =>
      produce(prev, (draft) => {
        const col = find(draft, { id: selectedColumn })
        col?.tasks.push(task)
      }),
    )
  }

  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      produce(prev, (draft) => {
        draft.forEach((col) => {
          col.tasks = reject(col.tasks, { id: taskId })
        })
      }),
    )
  }

  return {
    onTaskMove,
    addTask,
    deleteTask,
    columns,
  }
}
