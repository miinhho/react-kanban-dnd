import { use } from "react";
import { ColumnContext } from "../context/ColumnContext";

export function useColumn() {
  const ctx = use(ColumnContext);
  if (!ctx) {
    throw new Error("useColumn must be used within a ColumnContext");
  }
  return ctx;
}
