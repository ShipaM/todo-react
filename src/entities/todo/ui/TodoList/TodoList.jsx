import { Todoitem } from "../TodoItem";
import { memo, useContext } from "react";
import { TasksContext } from "../../model/task-context";

export const TodoList = memo(({ styles }) => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;
  const displayedTasks = filteredTasks ?? tasks;
  const taskCount = displayedTasks.length;

  if (!hasTasks)
    return (
      <div className={styles.emptyMessage} role="status" aria-live="polite">
        There are no tasks yet
      </div>
    );

  if (hasTasks && isEmptyFilteredTasks)
    return (
      <div className={styles.emptyMessage} role="status" aria-live="polite">
        Tasks not found
      </div>
    );

  return (
    <ul
      className={styles.list}
      aria-label={`Task list with ${taskCount} ${taskCount === 1 ? "item" : "items"}`}
      role="list"
    >
      {displayedTasks.map((task) => (
        <Todoitem key={task.id} className={styles.item} {...task} />
      ))}
    </ul>
  );
});
