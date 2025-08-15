import { createContext } from "react";

interface ColumnContextType {
  selectedColumn: string;
  setSelectedColumn: (column: string) => void;
}

export const ColumnContext = createContext<ColumnContextType | undefined>(
  undefined
);
