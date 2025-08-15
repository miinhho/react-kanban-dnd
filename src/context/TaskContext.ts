import { createContext } from "react";
import type { Column } from "../types";

interface TaskContextType {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
