import { memo, useContext } from "react";
import styles from "./Todoitem.module.scss";
import { TasksContext } from "../../model/task-context";
import RouterLink from "@/shared/ui/RouterLink";
// import { useCombinedRefs } from "../../../../hooks/useCombinedRefs";

export const Todoitem = memo(({ title, isDone, className = "", id }) => {
  const {
    firstIncompleteTaskRef,
    deleteTask,
    firstIncompleteTaskId,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
  } = useContext(TasksContext);

  // const animationRef = useRef(null);
  // const combinedRef = useCombinedRefs(
  //   id === firstIncompleteTaskId ? firstIncompleteTaskRef : null,
  //   animationRef
  // );

  // const handleClick = () => {
  //   animationRef.current?.classList.add(styles.isDisappearing);

  //   setTimeout(() => {
  //     deleteTask(id);
  //   }, 400);
  // };

  const taskStatus = isDone ? "completed" : "incomplete";

  return (
    <li
      className={`
    ${styles.todoItem} 
    ${className}
    ${id === disappearingTaskId ? styles.isDisappearing : ""} 
    ${id === appearingTaskId ? styles.isAppearing : ""}`}
      // ref={combinedRef}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
      aria-label={`Task: ${title}, ${taskStatus}`}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => toggleTaskComplete(id, target.checked)}
        aria-label={`Mark "${title}" as ${isDone ? "incomplete" : "complete"}`}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {isDone ? `Unmark ${title} as done` : `Mark ${title} as done`}
      </label>
      <RouterLink
        to={`/tasks/${id}`}
        aria-label={`View details for task: ${title}`}
      >
        {title}
      </RouterLink>
      <button
        className={styles.deleteButton}
        aria-label={`Delete task: ${title}`}
        title={`Delete task: ${title}`}
        type="button"
        onClick={() => deleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
});
