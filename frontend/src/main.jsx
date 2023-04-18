import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoAuthenticated from "./routes/todo-authenticated";
import TodoKeyless from "./routes/todo-keyless";
import Configuration from "./routes/configuration";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import Index from "./routes/index";
import Root from "./routes/root";
import React from "react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "todo-keyless",
        element: <TodoKeyless />,
      },
      {
        path: "todo-authenticated",
        element: <TodoAuthenticated />,
      },
      {
        path: "configuration",
        element: <Configuration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
