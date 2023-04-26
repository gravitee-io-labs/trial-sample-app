import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Analytics from "./routes/Analytics";
import NotificationHistory from "./routes/NotificationHistory";
import Configuration from "./routes/Configuration";
import ReactDOM from "react-dom/client";
import ErrorPage from "./ErrorPage";
import Todos from "./routes/Todos";
import RootLayout from "./layouts/RootLayout";
import React from "react";
import "./assets/styles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
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
