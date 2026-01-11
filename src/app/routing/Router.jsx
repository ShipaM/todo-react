import { useRoute } from "@/shared/hooks/useRoute";

const matchPath = (path, route) => {
  const pathParts = path.split("/");
  const routeParts = route.split("/");

  if (pathParts.length !== routeParts.length) return null;

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const paramName = routeParts[i].slice(1);

      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

const Router = ({ routes }) => {
  const path = useRoute();

  // if (path.startsWith("/tasks")) {
  //   const id = path.replace("/tasks/", "");
  //   const TaskPage = routes["/tasks/:id"];

  //   return <TaskPage params={{ id }} />;
  // }

  // const Page = routes[path] ?? routes["*"];

  // return <Page />;

  for (const route in routes) {
    const params = matchPath(path, route);

    if (params) {
      const Page = routes[route];

      return <Page params={params} />;
    }
  }

  const NotFound = routes["*"];

  return <NotFound />;
};

export default Router;
