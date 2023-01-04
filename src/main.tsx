import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import { SelectionsProvider } from "./selectionsProvider";
import Index, { loader as coursesLoader } from "./routes";
import Course, { loader as studentsLoader } from "./routes/course";
import EditStudent from "./routes/editStudent";
import Student, { loader as studentLoader } from "./routes/student";
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
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId",
        loader: studentLoader,
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
