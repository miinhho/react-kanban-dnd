/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../constant';
import type { Column, Task } from '../types';
import TaskCard from './TaskCard';
import styles from './TaskColumn.module.css';

interface ColumnProps {
  column: Column;
  onTaskMove: (taskId: string, toColumn: string) => void;
  onTaskDelete: (taskId: string) => void;
}

interface TaskItem {
  id: string;
  task: Task;
}

const columnStyle = css({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  minHeight: '400px',
})

const columnOverStyle = css({
  background: 'rgba(116, 116, 116, 0.1) !important',
  border: '2px dashed #aeaeaeff !important',
})

const TaskColumn = ({ column, onTaskMove, onTaskDelete }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: TaskItem) => {
      onTaskMove(item.task.id, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as any}
      css={[
        columnStyle,
        isOver && columnOverStyle
      ]}
    >
      <h2 className={styles.columnTitle}>{column.title}</h2>
      <div className={styles.tasksContainer}>
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onTaskDelete}
          />
        ))}
        {column.tasks.length === 0 && (
          <div className="empty-placeholder">
            여기로 작업을 드래그해서 추가하세요.
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;