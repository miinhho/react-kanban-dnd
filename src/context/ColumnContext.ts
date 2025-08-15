import { createContext } from "react";
import type { ColumnId } from "../types";

interface ColumnContextType {
  selectedColumn: ColumnId;
  setSelectedColumn: React.Dispatch<React.SetStateAction<string>>;
}

export const ColumnContext = createContext<ColumnContextType | undefined>(
  undefined
);
