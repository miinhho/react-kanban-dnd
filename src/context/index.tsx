import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnContext } from "./ColumnContext";

const initialColumn = 'todo';

export const AppContext = ({ children }: React.PropsWithChildren) => {
  const [selectedColumn, setSelectedColumn] = useState(initialColumn);

  return (
    <DndProvider backend={HTML5Backend}>
      <ColumnContext value={{ selectedColumn, setSelectedColumn }}>
        {children}
      </ColumnContext>
    </DndProvider>
  );
};
