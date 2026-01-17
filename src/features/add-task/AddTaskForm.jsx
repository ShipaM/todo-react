import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { useContext, useState } from "react";
import { TasksContext } from "@/entities/todo";

export const AddTaskForm = ({ styles }) => {
  const [error, setError] = useState("");
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle);
    }
  };

  const onInput = (e) => {
    const { value } = e.target;

    const clearValue = value.trim();

    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
    setNewTaskTitle(value);

    setError(hasOnlySpaces ? "Task title cannot be empty" : "");
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      aria-label="Add new task form"
      role="form"
    >
      <Field
        className={styles.field}
        id={"new-task"}
        label={"New task title"}
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
        required
      />
      <Button
        type="submit"
        className="todo__add-button"
        isDisabled={isNewTaskTitleEmpty}
        ariaLabel="Add new task"
      >
        Add
      </Button>
    </form>
  );
};
