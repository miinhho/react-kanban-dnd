/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemType } from '../constant';
import type { Task } from '../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const taskCardStyle = css({
  background: 'white',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  cursor: 'grab',
  position: 'relative',
  marginBottom: '15px',
  ":hover": {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  ":active": {
    cursor: 'grabbing',
  }
})

const taskCardDraggingStyle = css({
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3) !important',
  opacity: 0.5,
  zIndex: 1000,
})

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { id: task.id, task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drag as any}
      css={[
        taskCardStyle,
        isDragging && taskCardDraggingStyle
      ]}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskHeader}>{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className={styles.deleteButton}
          aria-label="작업 삭제 버튼"
        >
          ❌
        </button>
      </div>
      {task.description && (
        <p className={styles.taskDescription}>
          {task.description}
        </p>
      )}
      <div className={styles.taskHandle}>
        ⋮⋮
      </div>
    </div>
  );
}

export default TaskCard;