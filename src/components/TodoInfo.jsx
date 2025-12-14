import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../context/task-context";

export const TodoInfo = memo(() => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const done = useMemo(
    () => tasks.filter((task) => task.isDone).length,
    [tasks]
  );
  const hasTasks = total > 0;

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
});
