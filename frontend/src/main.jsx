import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Analytics from "./routes/analytics";
import NotificationHistory from "./routes/notification-history";
import Configuration from "./routes/configuration";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import Todos from "./routes/todos";
import Root from "./routes/root";
import React from "react";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Todos />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="notification-history" element={<NotificationHistory />} />
      <Route path="configuration" element={<Configuration />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
