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

    setColumns((prev) => {
      const newColumns = [...prev];

      const fromColumn = newColumns.find((col) => col.id === fromColumnId);
      const toColumn = newColumns.find((col) => col.id === toColumnId);

      if (fromColumn && toColumn) {
        const taskIndex = fromColumn.tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          const [task] = fromColumn.tasks.splice(taskIndex, 1);
          toColumn.tasks.push(task);
        }
      }

      return newColumns;
    });
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
      prev.map((column) =>
        column.id === selectedColumn
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  return {
    onTaskMove,
    addTask,
    deleteTask,
    columns,
  };
};
