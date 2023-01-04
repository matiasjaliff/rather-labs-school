import { useLoaderData } from "react-router-dom";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import StudentData from "../components/studentData";
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
  return (
    <div id="student">
      <div className="header">
        <h1>Student Details</h1>
        <div>
          <EditFilled className="icon" />
        </div>
      </div>
      <div className="details-container">
        <div className="photo-container">
          <Avatar size={200} icon={<UserOutlined />}></Avatar>
        </div>
        <div className="data-container">
          <StudentData student={student} />
        </div>
      </div>
    </div>
  );
}
