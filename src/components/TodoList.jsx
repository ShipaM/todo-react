import { Todoitem } from "./TodoItem/Todoitem";
import { memo, useContext } from "react";
import { TasksContext } from "../context/task-context";

export const TodoList = memo(({ styles }) => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;

  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks)
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;

  if (hasTasks && isEmptyFilteredTasks)
    return <div className={styles.emptyMessage}>Tasks not found</div>;

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <Todoitem key={task.id} className={styles.item} {...task} />
      ))}
    </ul>
  );
});
