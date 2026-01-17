import Router from "./routing";
import TaskPage from "@/pages/TaskPage/TaskPage";
import TasksPage from "@/pages/TasksPages/TasksPage";
import RouterLink from "@/shared/ui/RouterLink";
import "./styles";

const NotFoundPage = () => (
  <main role="main" aria-label="Page not found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <RouterLink to="/" aria-label="Go back to home page">
      ← Back to home
    </RouterLink>
  </main>
);

const SkipLink = () => (
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
);

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": NotFoundPage,
  };

  return (
    <>
      <SkipLink />
      <div id="main-content">
        <Router routes={routes} />
      </div>
    </>
  );
};

export default App;
