import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Analytics from "./routes/analytics";
import NotificationHistory from "./routes/notification-history";
import Configuration from "./routes/configuration";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import Todos from "./routes/todos";
import Root from "./routes/root";
import React from "react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Todos /> },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "notification-history",
        element: <NotificationHistory />,
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
