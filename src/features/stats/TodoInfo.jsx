import { memo, useContext, useMemo } from "react";
import { TasksContext } from "@/entities/todo/model/task-context";

export const TodoInfo = memo(({ styles }) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const done = useMemo(
    () => tasks.filter((task) => task.isDone).length,
    [tasks],
  );
  const hasTasks = total > 0;
  const remaining = total - done;

  return (
    <section className={styles.info} aria-label="Task statistics">
      <div
        className={styles.totalTasks}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          aria-label={`${done} tasks completed out of ${total} total. ${remaining} tasks remaining.`}
        >
          Done {done} from {total}
        </span>
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
          aria-label={`Delete all ${total} tasks`}
        >
          Delete all
        </button>
      )}
    </section>
  );
});
