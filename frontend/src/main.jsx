import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ErrorPage from "./ErrorPage";
import "./assets/styles/index.css";
import RootLayout from "./layouts/RootLayout";
import Configuration from "./routes/Configuration";
import Home from "./routes/Home";
import NotificationCenter from "./routes/NotificationCenter";
import Todos from "./routes/Todos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="todos" element={<Todos />} />
      <Route path="notification-center" element={<NotificationCenter />} />
      <Route path="configuration" element={<Configuration />} />
    </Route>
  ),
  {
    basename: "/trial-sample-app",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Zoom}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
