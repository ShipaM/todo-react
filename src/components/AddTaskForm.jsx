import { Button } from "./Button";
import { Field } from "./Field";
import { useContext } from "react";
import { TasksContext } from "../context/task-context";

export const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

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
        ref={newTaskInputRef}
      />
      <Button type="submit" className="todo__add-button">
        Add
      </Button>
    </form>
  );
};
