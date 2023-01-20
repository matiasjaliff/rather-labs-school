////////// IMPORTS //////////

// React Router
import { Form, useLoaderData } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";

// Types
import type { CourseType, StudentType } from "../../config/databaseTypes";

// Components
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Space } from "antd";
import StudentData from "../components/studentData";

////////// COMPONENT //////////

export default function Student(): JSX.Element {
  const { student, siblings, course } = useLoaderData() as {
    student: StudentType;
    siblings: StudentType[];
    course: CourseType | null;
  };

  const { session } = useSession() as { session: string | null };

  return (
    <div id="student">
      <div className="header">
        <h1>Student Details</h1>
        <div>
          {session && (
            <Space>
              <Button
                type="primary"
                size="large"
                href={`/students/${student.student_id}/edit`}
              >
                Edit student
              </Button>
              <Form
                method="post"
                action={`/students/${student.student_id}/delete`}
              >
                <input name="origin" hidden readOnly value="/students"></input>
                <Button type="primary" size="large" htmlType="submit">
                  Delete student
                </Button>
              </Form>
            </Space>
          )}
        </div>
      </div>
      <div className="details-container">
        <div className="photo-container">
          <Avatar size={200} icon={<UserOutlined />}></Avatar>
        </div>
        <div className="data-container">
          <StudentData student={student} siblings={siblings} course={course} />
        </div>
      </div>
    </div>
  );
}
