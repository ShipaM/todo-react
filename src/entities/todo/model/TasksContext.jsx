import { TasksContext } from "./task-context";
import { useTasks } from "./useTasks";
import { useIncompleteScroll } from "./useIncompleteTaskScroll";
import { useMemo } from "react";

export const TasksProvider = ({ children }) => {
  const {
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
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteScroll(tasks);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
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
    }),
    [
      tasks,
      filteredTasks,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
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
    ],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
