import { useLoaderData } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import StudentData from "../components/studentData";
import type { StudentType } from "../../config/types";
import { useSession } from "../sessionProvider";

export default function Student(): JSX.Element {
  const { session } = useSession() as { session: string | null };
  const student = useLoaderData() as StudentType;

  return (
    <div id="student">
      <div className="header">
        <h1>Student Details</h1>
        <div>
          {session && (
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={() => console.log("Edit student")}
            >
              Edit student
            </Button>
          )}
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
