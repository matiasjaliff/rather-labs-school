////////// IMPORTS //////////

// React Router
import { useLoaderData } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";
import { useSelections } from "../providers/selectionsProvider";

// Types
import type { CourseType, StudentType } from "../../config/databaseTypes";

// Components
import { Button } from "antd";
import StudentsTable from "../components/studentsTable";

////////// COMPONENT //////////

export default function Course(): JSX.Element {
  const students = useLoaderData() as StudentType[];

  const { session } = useSession() as { session: string | null };
  const { selectedCourse } = useSelections() as {
    selectedCourse: CourseType;
  };

  return (
    <div id="course">
      <div className="header">
        <h1>Course {`${selectedCourse.grade}º ${selectedCourse.section}`}</h1>
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
        <li>Shift: {selectedCourse.shift}</li>
        <li>Capacity: {selectedCourse.capacity}</li>
      </ul>
      <h2>List of students</h2>
      <StudentsTable students={students} />
    </div>
  );
}
