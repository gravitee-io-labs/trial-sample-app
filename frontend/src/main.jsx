import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import "./assets/styles/index.css";
import RootLayout from "./layouts/RootLayout";
import Analytics from "./routes/Analytics";
import Configuration from "./routes/Configuration";
import NotificationHistory from "./routes/NotificationHistory";
import Todos from "./routes/Todos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Todos />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="notification-history" element={<NotificationHistory />} />
      <Route path="configuration" element={<Configuration />} />
    </Route>
  ),
  {
    basename: "/trial-sample-app",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
