////////// IMPORTS //////////

// React and React Router
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Providers
import { SessionProvider } from "./providers/sessionProvider";
import { SelectionsProvider } from "./providers/selectionsProvider";

// Loaders
import {
  coursesLoader,
  studentsLoader,
  studentsLoaderByCourse,
  studentLoaderById,
  coursesAndstudentsNamesLoader,
} from "../lib/loaders";

// Components
import Root from "./routes/root";
import Index from "./routes";
import Course from "./routes/course";
import EditStudent from "./routes/editStudent";
import Student from "./routes/student";
import AdminStudents from "./routes/adminStudents";
import ErrorPage from "./routes/error-page";

// Style
import "./index.css";

////////// DEFINITIONS //////////

// The loaders defined in this router are a new feature of React Router v6.4 (https://reactrouter.com/en/main/start/overview)
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
        loader: coursesAndstudentsNamesLoader,
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
        loader: coursesAndstudentsNamesLoader,
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

////////// COMPONENT //////////

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <SelectionsProvider>
        <RouterProvider router={router} />
      </SelectionsProvider>
    </SessionProvider>
  </React.StrictMode>
);
