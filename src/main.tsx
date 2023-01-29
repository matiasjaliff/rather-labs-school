////////// IMPORTS //////////

// React and React Router
import React from "react";
import ReactDOM from "react-dom/client";
import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";

// Providers
import { SessionProvider } from "./providers/sessionProvider";

// Loaders
import {
  allCoursesLoader,
  allStudentsLoader,
  allCoursesAndAllStudentsLoader,
  oneCourseAndItsStudentsLoader,
  studentLoaderById,
} from "../lib/loaders";

// Actions
import { deleteStudent } from "../lib/actions";

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
        loader: allCoursesLoader as LoaderFunction,
        errorElement: <ErrorPage />,
      },
      {
        path: "courses/:courseId",
        element: <Course />,
        loader: oneCourseAndItsStudentsLoader as LoaderFunction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/students",
        loader: allStudentsLoader as LoaderFunction,
        element: <AdminStudents />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/new",
        loader: allCoursesAndAllStudentsLoader as LoaderFunction,
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId",
        loader: studentLoaderById as LoaderFunction,
        element: <Student />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId/edit",
        loader: allCoursesAndAllStudentsLoader as LoaderFunction,
        element: <EditStudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId/delete",
        action: deleteStudent as ActionFunction,
      },
    ],
  },
]);

////////// COMPONENT //////////

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
