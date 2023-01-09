import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionProvider } from "./providers/sessionProvider";
import { SelectionsProvider } from "./providers/selectionsProvider";
import {
  coursesLoader,
  studentsLoader,
  studentsLoaderByCourse,
  studentLoaderById,
  coursesAndstudentsLoader,
} from "../lib/loaders";
import Root from "./routes/root";
import Index from "./routes";
import Course from "./routes/course";
import EditStudent from "./routes/editStudent";
import Student from "./routes/student";
import AdminStudents from "./routes/adminStudents";
import ErrorPage from "./routes/error-page";
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
        loader: studentsLoaderByCourse,
        errorElement: <ErrorPage />,
      },
      {
        path: "/students",
        loader: studentsLoader,
        element: <AdminStudents />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/new",
        loader: coursesAndstudentsLoader,
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
        path: "students/edit/:studentId",
        loader: coursesAndstudentsLoader,
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <SelectionsProvider>
        <RouterProvider router={router} />
      </SelectionsProvider>
    </SessionProvider>
  </React.StrictMode>
);
