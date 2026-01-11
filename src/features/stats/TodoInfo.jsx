import { memo, useContext, useMemo } from "react";
import { TasksContext } from "@/entities/todo/model/task-context";

export const TodoInfo = memo(({ styles }) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const done = useMemo(
    () => tasks.filter((task) => task.isDone).length,
    [tasks]
  );
  const hasTasks = total > 0;

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
});
