import { useTask } from "../hooks/useTask"
import CustomDragLayer from "./CustomDragLayer"
import TaskColumn from "./TaskColumn"
import styles from './TaskContainer.module.css'

const TaskContainer = () => {
  const { deleteTask, onTaskMove, columns } = useTask()

  return (
    <div className={styles.kanbanContainer}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onTaskMove={onTaskMove}
          onTaskDelete={deleteTask}
        />
      ))}
    </div>
  )
}

export default TaskContainer;

TaskContainer.DragLayer = CustomDragLayer;