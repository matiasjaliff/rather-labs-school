import { useLoaderData } from "react-router-dom";
import {
  EditFilled,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import type { CourseType, StudentType } from "../../config/types";
import { useSelections } from "../selectionsProvider";
import supabase from "../../config/supabaseClient";
import StudentsTable from "../components/studentsTable";

export async function loader({ params }: { params: { courseId: number } }) {
  const { data: students, error } = await supabase
    .from("students")
    .select()
    .eq("course_id", params.courseId);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return students;
}

export default function Course(): JSX.Element {
  const students = useLoaderData() as StudentType[];
  const { selectedCourse } = useSelections() as {
    selectedCourse: CourseType;
  };

  return (
    <div id="course">
      <div className="header">
        <h1>Course {`${selectedCourse.grade}º ${selectedCourse.section}`}</h1>
        <div>
          <EditFilled className="icon" />
          <LeftCircleFilled className="icon" />
          <RightCircleFilled className="icon" />
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
