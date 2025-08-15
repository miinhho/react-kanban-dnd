import { css } from "@emotion/react";
import { useDragLayer } from "react-dnd";
import type { Task } from "../types";
import styles from "./CustomDragLayer.module.css";

const previewStyle = (x: number, y: number) => css({
  position: 'absolute',
  transform: `translate(${x}px, ${y}px)`,
  boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
  background: 'white',
  padding: '14px',
  borderRadius: '10px',
  minWidth: '220px',
  pointerEvents: 'none',
  transition: 'transform 0.05s linear',
})

const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset || !item) return null;

  const width = item.width ?? 0;
  const height = item.height ?? 0;

  const task = (item as { task?: Task }).task as Task | undefined;
  const x = Math.round(currentOffset.x - width / 2);
  const y = Math.round(currentOffset.y - height / 2);

  return (
    <div className={styles.previewLayer}>
      <div css={previewStyle(x, y)}>
        <div className={styles.taskTitle}>{task?.title}</div>
        {task?.description && (
          <div className={styles.taskDescription}>
            {task.description}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomDragLayer;