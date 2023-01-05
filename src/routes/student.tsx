import { useLoaderData } from "react-router-dom";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import StudentData from "../components/studentData";
import type { StudentType } from "../../config/types";

export default function Student(): JSX.Element {
  const student = useLoaderData() as StudentType;

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
