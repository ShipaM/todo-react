import { useEffect, useState } from "react";
import tasksAPI from "@/shared/api/tasks/tasksAPI";
import RouterLink from "@/shared/ui/RouterLink";

const TaskPage = ({ params }) => {
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [taskId]);

  if (isLoading) {
    return (
      <main role="main" aria-busy="true" aria-live="polite">
        <p role="status">Loading task details...</p>
      </main>
    );
  }

  if (hasError) {
    return (
      <main role="main" aria-live="assertive">
        <h1>Error</h1>
        <p role="alert">Task not found</p>
        <RouterLink to="/" aria-label="Go back to task list">
          ← Back to tasks
        </RouterLink>
      </main>
    );
  }

  return (
    <main role="main" aria-label="Task details">
      <nav aria-label="Breadcrumb">
        <RouterLink to="/" aria-label="Go back to task list">
          ← Back to tasks
        </RouterLink>
      </nav>
      <article aria-labelledby="task-title">
        <h1 id="task-title">{task.title}</h1>
        <p>
          <span
            aria-label={`Task status: ${task.isDone ? "completed" : "not completed"}`}
          >
            Status: {task.isDone ? "✓ Done" : "○ Not done"}
          </span>
        </p>
      </article>
    </main>
  );
};

export default TaskPage;
