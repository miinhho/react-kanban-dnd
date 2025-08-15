import { useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";
import styles from './TaskForm.module.css';

export default function TaskForm() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const { addTask, columns } = useTask()
  const { selectedColumn, setSelectedColumn } = useColumn();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

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
        onChange={(e) => setSelectedColumn(e.target.value)}
        className={styles.columnSelect}
      >
        {columns.map(column => (
          <option key={column.id} value={column.id}>{column.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Task title..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className={styles.taskInput}
      />
      <input
        type="text"
        placeholder="Task description..."
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