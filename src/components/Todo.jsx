import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { TodoInfo } from "./TodoInfo";
import { TodoList } from "./TodoList";
import { Button } from "./Button";
import { useState, useEffect, useRef } from "react";

export const Todo = () => {
  const todoTasks = [
    { id: 1, title: "Task 1", isDone: false },
    { id: 2, title: "Task 2", isDone: true },
    { id: 3, title: "Task 3", isDone: false },
  ];

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return todoTasks;
  });

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find((task) => !task.isDone)?.id;

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

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      searchQuery("");
      newTaskInputRef.current?.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

  const filteredTasks = clearSearchQuery
    ? tasks.filter((task) => {
        return task.title.toLowerCase().includes(clearSearchQuery);
      })
    : null;

  useEffect(() => {
    newTaskInputRef.current?.focus();
  }, []);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        setNewTaskTitle={setNewTaskTitle}
        newTaskTitle={newTaskTitle}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter((task) => task.isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteButtonClick={deleteTask}
        onTaskCompleteChange={togleTaskComplete}
        firstIncompleteTaskId={firstIncompleteTaskId}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
      />
    </div>
  );
};
