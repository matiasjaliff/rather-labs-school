////////// IMPORTS //////////

// React Router
import { useLoaderData } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";

// Types
import type { CourseType, StudentType } from "../../config/databaseTypes";

// Components
import { Button } from "antd";
import StudentsTable from "../components/studentsTable";

////////// COMPONENT //////////

export default function Course(): JSX.Element {
  const { course, students } = useLoaderData() as {
    course: CourseType;
    students: StudentType[];
  };

  const { session } = useSession() as { session: string | null };

  return (
    <div id="course">
      <div className="header">
        <h1>Course {`${course.grade}º ${course.section}`}</h1>
        <div>
          {session && (
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={() => console.log("Edit course")}
            >
              Edit course
            </Button>
          )}
        </div>
      </div>
      <ul>
        <li>Shift: {course.shift}</li>
        <li>
          Occupancy: {students.length} / {course.capacity}
        </li>
      </ul>
      <h2>List of students</h2>
      <StudentsTable students={students} />
    </div>
  );
}
