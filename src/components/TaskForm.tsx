import { useRef, useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";
import type { ColumnId } from "../types";
import styles from './TaskForm.module.css';

export default function TaskForm() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const taskTitleInputRef = useRef<HTMLInputElement>(null);
  const { addTask, columns } = useTask()
  const { selectedColumn, setSelectedColumn } = useColumn();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert("제목을 입력해주세요.");
      taskTitleInputRef.current?.focus();
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
  };

  return (
    <div className={styles.addTaskForm}>
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
        ref={taskTitleInputRef}
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
        onClick={handleAddTask}
        className={styles.addButton}
      >
        ➕ Add Task
      </button>
    </div>
  )
}