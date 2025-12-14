import { Field } from "./Field";
import { useContext } from "react";
import { TasksContext } from "../context/task-context";

export const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);
  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        className={"todo__field"}
        id={"search-task"}
        label={"Search task"}
        type={"search"}
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};
