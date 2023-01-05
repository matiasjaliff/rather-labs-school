import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  coursesLoader,
  studentsLoader,
  studentLoaderById,
} from "../lib/loaders";
import Root from "./routes/root";
import { SelectionsProvider } from "./selectionsProvider";
import Index from "./routes";
import Course from "./routes/course";
import EditStudent from "./routes/editStudent";
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
        loader: studentsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/new",
        loader: coursesLoader,
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId",
        loader: studentLoaderById,
        element: <Student />,
        errorElement: <ErrorPage />,
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SelectionsProvider>
      <RouterProvider router={router} />
    </SelectionsProvider>
  </React.StrictMode>
);
