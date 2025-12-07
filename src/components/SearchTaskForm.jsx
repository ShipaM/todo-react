import { Field } from "./Field";

export const SearchTaskForm = ({ searchQuery, setSearchQuery }) => {
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
