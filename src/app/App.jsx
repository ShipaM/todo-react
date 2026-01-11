import Router from "./routing";
import TaskPage from "@/pages/TaskPage/TaskPage";
import TasksPage from "@/pages/TasksPages/TasksPage";
import "./styles";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404 Page not found</div>,
  };

  return <Router routes={routes} />;
};

export default App;
