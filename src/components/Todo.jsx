import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { TodoInfo } from "./TodoInfo";
import { TodoList } from "./TodoList";
import { useState } from "react";

export const Todo = () => {
  const todoTasks = [
    { id: 1, title: "Task 1", isDone: false },
    { id: 2, title: "Task 2", isDone: true },
    { id: 3, title: "Task 3", isDone: false },
  ];
  const [tasks, setTasks] = useState(todoTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isConfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const togleTaskComplete = (taskId, isDone) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filterTasks = (query) => {
    console.log(`Filter tasks by ${query}`);
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        setNewTaskTitle={setNewTaskTitle}
        newTaskTitle={newTaskTitle}
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter((task) => task.isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteButtonClick={deleteTask}
        onTaskCompleteChange={togleTaskComplete}
      />
    </div>
  );
};
