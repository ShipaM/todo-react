import { Todoitem } from "./Todoitem";
export const TodoList = ({ tasks = [] }) => {
  const hasTasks = true;

  if (!hasTasks) return <div className="todo__empty-message"></div>;

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <Todoitem
          key={task}
          className="todo__item"
          id={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  );
};
