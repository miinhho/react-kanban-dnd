import { css } from '@emotion/react'
import { useDrop } from 'react-dnd'
import { ItemType } from '../constant'
import type { Column, Task } from '../types'
import TaskCard from './TaskCard'
import styles from './TaskColumn.module.css'

const Styles = {
  column: css({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minHeight: '400px',
  }),
  columnOver: css({
    background: 'rgba(116, 116, 116, 0.1) !important',
    border: '2px dashed #aeaeaeff !important',
  }),
}

interface ColumnProps {
  column: Column
  onTaskMove: (taskId: string, toColumn: string) => void
  onTaskDelete: (taskId: string) => void
}

const TaskColumn = ({ column, onTaskMove, onTaskDelete }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: Task) => {
      onTaskMove(item.id, column.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div ref={drop as never} css={[Styles.column, isOver && Styles.columnOver]}>
      <h2 className={styles.columnTitle}>{column.title}</h2>
      <div className={styles.tasksContainer}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onTaskDelete} />
        ))}
        {column.tasks.length === 0 && (
          <div className="empty-placeholder">여기로 작업을 드래그해서 추가하세요.</div>
        )}
      </div>
    </div>
  )
}

export default TaskColumn
