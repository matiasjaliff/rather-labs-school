import { useLoaderData } from "react-router-dom";

import {
  EditFilled,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";

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
  // To properly cast useLoaderData and get types from loader, refer to the following:
  // www.typescriptlang.org/docs/handbook/2/typeof-types.html
  // www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
  const students = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div id="course">
      <div className="header">
        <h1>Course 1º A</h1>
        <div>
          <EditFilled className="icon" />
          <LeftCircleFilled className="icon" />
          <RightCircleFilled className="icon" />
        </div>
      </div>
      <ul>
        <li>Shift: Morning</li>
        <li>Occupancy: 12/20</li>
      </ul>
      <h2>List of students</h2>
      <StudentsTable students={students} />
    </div>
  );
}
