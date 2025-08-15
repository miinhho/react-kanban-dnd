import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initialColumn, initialData } from "../constant";
import type { Column, ColumnId } from "../types";
import { ColumnContext } from "./ColumnContext";
import { TaskContext } from "./TaskContext";

export const AppContext = ({ children }: React.PropsWithChildren) => {
  const [selectedColumn, setSelectedColumn] = useState<ColumnId>(initialColumn);
  const [columns, setColumns] = useState<Column[]>(initialData);

  return (
    <DndProvider backend={HTML5Backend}>
      <ColumnContext value={{ selectedColumn, setSelectedColumn }}>
        <TaskContext value={{ columns, setColumns }}>
          {children}
        </TaskContext>
      </ColumnContext>
    </DndProvider>
  );
};
