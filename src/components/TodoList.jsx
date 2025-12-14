import { Todoitem } from "./Todoitem";
import { memo, useContext } from "react";
import { TasksContext } from "../context/task-context";

export const TodoList = memo(() => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;

  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks)
    return <div className="todo__empty-message">There are no tasks yet</div>;

  if (hasTasks && isEmptyFilteredTasks)
    return <div className="todo__empty-message">Tasks not found</div>;

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <Todoitem key={task.id} className="todo__item" {...task} />
      ))}
    </ul>
  );
});
