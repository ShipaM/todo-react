import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import tasksAPI from "@/shared/api/tasks/tasksAPI";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL":
      return Array.isArray(action.tasks) ? action.tasks : state;
    case "ADD":
      return [...state, action.task];
    case "DELETE":
      return state.filter((task) => task.id !== action.id);
    case "DELETE_ALL":
      return [];
    case "TOGGLE": {
      const { id, isDone } = action;
      return state.map((task) => (task.id === id ? { ...task, isDone } : task));
    }
    default:
      return state;
  }
};
export const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [tasks, setTasks] = useState([]);
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => {
        dispatch({ type: "DELETE_ALL" });
      });
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        dispatch({ type: "DELETE", id: taskId });
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      // оптимистично обновляем UI
      dispatch({ type: "TOGGLE", id: taskId, isDone });
    });
  }, []);

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
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

    tasksAPI
      .getAll()
      .then((serverTasks) => dispatch({ type: "SET_ALL", tasks: serverTasks }));
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
