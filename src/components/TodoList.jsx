import { Todoitem } from "./Todoitem";
export const TodoList = ({
  tasks = [],
  onDeleteButtonClick,
  onTaskCompleteChange,
  filteredTasks,
  firstIncompleteTaskId,
  firstIncompleteTaskRef,
}) => {
  const hasTasks = tasks.length > 0;

  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks)
    return <div className="todo__empty-message">There are no tasks yet</div>;

  if (hasTasks && isEmptyFilteredTasks)
    return <div className="todo__empty-message">Tasks not found</div>;

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <Todoitem
          key={task.id}
          className="todo__item"
          ref={
            task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
          }
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onDeleteButtonClick={onDeleteButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  );
};
