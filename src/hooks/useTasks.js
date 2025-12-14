import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTasksLocalStorage } from "../hooks/useTasksLocalStorage";
export const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();

  const todoTasks = [
    { id: 1, title: "Task 1", isDone: false },
    { id: 2, title: "Task 2", isDone: true },
    { id: 3, title: "Task 3", isDone: false },
  ];

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(savedTasks ?? todoTasks);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");
    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone };
        }
        return task;
      });
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const addTask = useCallback((title) => {
    const newTask = {
      id: crypto?.randomUUID?.() ?? Date.now(),
      title,
      isDone: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current?.focus();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

    return clearSearchQuery
      ? tasks.filter((task) => {
          return task.title.toLowerCase().includes(clearSearchQuery);
        })
      : null;
  }, [tasks, searchQuery]);

  useEffect(() => {
    newTaskInputRef.current?.focus();
  }, []);

  return {
    tasks,
    filteredTasks,
    deleteAllTasks,
    deleteTask,
    toggleTaskComplete,
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
  };
};
