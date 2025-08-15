import { useCallback, useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";
import type { ColumnId } from "../types";
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const { addTask, columns } = useTask()
  const { selectedColumn, setSelectedColumn } = useColumn();

  const handleAddTask = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription
    };

    addTask(newTask);

    setNewTaskTitle('');
    setNewTaskDescription('');
  }, [addTask, newTaskTitle, newTaskDescription]);

  return (
    <form className={styles.addTaskForm} onSubmit={handleAddTask}>
      <select
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value as ColumnId)}
        className={styles.columnSelect}
      >
        {columns.map(column => (
          <option key={column.id} value={column.id}>{column.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="제목"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className={styles.taskInput}
      />
      <input
        type="text"
        placeholder="설명"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        className={styles.taskInput}
      />
      <button
        type="submit"
        disabled={!newTaskTitle.trim()}
        aria-disabled={!newTaskTitle.trim()}
        className={styles.addButton}
      >
        ➕ 작업 추가
      </button>
    </form>
  )
}

export default TaskForm;