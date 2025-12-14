import { TasksContext } from "./task-context";
import { useTasks } from "../hooks/useTasks";
import { useIncompleteScroll } from "../hooks/useIncompleteTaskScroll";

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
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteScroll(tasks);

  return (
    <TasksContext.Provider
      value={{
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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
