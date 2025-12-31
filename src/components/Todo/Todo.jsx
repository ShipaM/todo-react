import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { SearchTaskForm } from "../SearchTaskForm/SearchTaskForm";
import { TodoInfo } from "../TodoInfo/TodoInfo";
import { TodoList } from "../TodoList";
import { Button } from "../Button/Button";
import { useContext } from "react";
import { TasksContext } from "../../context/task-context";
import styles from "./Todo.module.scss";
export const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);
  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList styles />
    </div>
  );
};
