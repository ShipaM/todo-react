import { Button } from "./Button";
import { Field } from "./Field";
export const AddTaskForm = () => {
  return (
    <form className="todo__form">
      <Field
        className={"todo__field"}
        id={"new-task"}
        label={"New task title"}
        type={"text"}
      />
      <Button type="submit" className="todo__add-button">
        Add
      </Button>
    </form>
  );
};
