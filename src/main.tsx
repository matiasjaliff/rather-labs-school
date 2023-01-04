import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Index, { loader as coursesLoader } from "./routes";
import Course from "./routes/course";
import Student from "./routes/student";
import Admin from "./routes/admin";
import ErrorPage from "./error-page";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: coursesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "courses/:courseId",
        element: <Course />,
      },
      {
        path: "students/:studentId",
        element: <Student />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
