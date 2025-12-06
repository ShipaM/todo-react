import { Button } from "./Button";
import { Field } from "./Field";

export const AddTaskForm = ({ addTask, newTaskTitle, setNewTaskTitle }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className={"todo__field"}
        id={"new-task"}
        label={"New task title"}
        value={newTaskTitle}
        onInput={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button type="submit" className="todo__add-button">
        Add
      </Button>
    </form>
  );
};
