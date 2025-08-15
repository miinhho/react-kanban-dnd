import { produce } from "immer";
import { use } from "react";
import { TaskContext } from "../context/TaskContext";
import type { Task } from "../types";
import { useColumn } from "./useColumn";

const useTaskContext = () => {
  const ctx = use(TaskContext);
  if (!ctx) {
    throw new Error("useTask must be used within a TaskContext");
  }
  return ctx;
};

export const useTask = () => {
  const { columns, setColumns } = useTaskContext();
  const { selectedColumn } = useColumn();

  const findTaskColumn = (taskId: string): string | null => {
    for (const column of columns) {
      if (column.tasks.find((task) => task.id === taskId)) {
        return column.id;
      }
    }
    return null;
  };

  const moveTask = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => {
    if (fromColumnId === toColumnId) return;

    setColumns((prev) =>
      produce(prev, (draft) => {
        const from = draft.find((c) => c.id === fromColumnId);
        const to = draft.find((c) => c.id === toColumnId);
        if (!from || !to) return;

        const idx = from.tasks.findIndex((t) => t.id === taskId);
        if (idx === -1) return;

        const [task] = from.tasks.splice(idx, 1);
        to.tasks.push(task);
      })
    );
  };

  const onTaskMove = (taskId: string, toColumn: string) => {
    const actualFromColumn = findTaskColumn(taskId);
    if (actualFromColumn) {
      moveTask(taskId, actualFromColumn, toColumn);
    }
  };

  const addTask = (task: Task) => {
    if (!selectedColumn) return;
    setColumns((prev) =>
      produce(prev, (draft) => {
        const col = draft.find((c) => c.id === selectedColumn);
        if (col) col.tasks.push(task);
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      produce(prev, (draft) => {
        for (const col of draft) {
          col.tasks = col.tasks.filter((task) => task.id !== taskId);
        }
      })
    );
  };

  return {
    onTaskMove,
    addTask,
    deleteTask,
    columns,
  };
};
