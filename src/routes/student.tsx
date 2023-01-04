import { useLoaderData } from "react-router-dom";
import type { StudentType } from "../../config/types";
import supabase from "../../config/supabaseClient";

export async function loader({ params }: { params: { studentId: number } }) {
  const { data: student, error } = await supabase
    .from("students")
    .select()
    .eq("student_id", params.studentId);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return student[0];
}

export default function Student(): JSX.Element {
  const student = useLoaderData() as StudentType;
  console.log(student);
  return <p id="zero-state">STUDENT X</p>;
}
