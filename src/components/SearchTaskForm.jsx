import { Field } from "./Field";

export const SearchTaskForm = ({ onSearchInput }) => {
  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        className={"todo__field"}
        id={"search-task"}
        label={"Search task"}
        type={"search"}
        onInput={(e) => onSearchInput(e.target.value)}
      />
    </form>
  );
};
