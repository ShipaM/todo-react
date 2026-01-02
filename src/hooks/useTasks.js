import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import tasksAPI from "../api/tasksAPI";
export const useTasks = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");
    if (isConfirmed) {
      setTasks([]);

      Promise.all(
        tasks.map((task) => {
          return fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "DELETE",
          });
        })
      ).then(() => {
        setTasks([]);
      });
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      // оптимистично обновляем UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isDone } : task
        )
      );
    });
  }, []);

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prev) => [...prev, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current?.focus();
      setAppearingTaskId(addedTask.id);

      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

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

    tasksAPI.getAll().then(setTasks);
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
    disappearingTaskId,
    appearingTaskId,
  };
};
