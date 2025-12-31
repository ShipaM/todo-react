import { Field } from "../Field/Field";
import { useContext } from "react";
import { TasksContext } from "../../context/task-context";

export const SearchTaskForm = ({ styles }) => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Field
        className={styles.field}
        id={"search-task"}
        label={"Search task"}
        type={"search"}
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};
