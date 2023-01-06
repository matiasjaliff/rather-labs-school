import { useLoaderData } from "react-router-dom";
import { Button } from "antd";
import type { CourseType, StudentType } from "../../config/types";
import { useSession } from "../providers/sessionProvider";
import { useSelections } from "../providers/selectionsProvider";
import StudentsTable from "../components/studentsTable";

export default function Course(): JSX.Element {
  const { session } = useSession() as { session: string | null };
  const students = useLoaderData() as StudentType[];
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
