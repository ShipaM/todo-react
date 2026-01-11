import { useRef } from "react";

export const useIncompleteScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find((task) => !task.isDone)?.id;

  return { firstIncompleteTaskRef, firstIncompleteTaskId };
};
