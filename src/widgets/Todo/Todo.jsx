import { AddTaskForm } from "@/features/add-task";
import { SearchTaskForm } from "@/features/search-task";
import { TodoInfo } from "@/features/stats";
import { TodoList } from "@/entities/todo";
import { Button } from "@/shared/ui/Button";
import { useContext } from "react";
import { TasksContext } from "@/entities/todo";
import styles from "./Todo.module.scss";

export const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <main className={styles.todo} role="main" aria-label="Todo application">
      <h1 className={styles.title} id="todo-heading">
        To Do List
      </h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        ariaLabel="Scroll to first incomplete task"
      >
        Show first incomplete task
      </Button>
      <section aria-labelledby="todo-heading">
        <TodoList styles={styles} />
      </section>
    </main>
  );
};
