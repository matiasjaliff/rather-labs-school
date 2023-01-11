////////// IMPORTS //////////

// React Router
import { useLoaderData, useNavigate } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";

// Supabase client
import supabase from "../../config/supabaseClient";

// Types
import type { CourseType, StudentType } from "../../config/databaseTypes";

// Components
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import StudentData from "../components/studentData";

////////// COMPONENT //////////

export default function Student(): JSX.Element {
  const { student, siblings, course } = useLoaderData() as {
    student: StudentType;
    siblings: StudentType[];
    course: CourseType | undefined;
  };
  const navigate = useNavigate();

  const { session } = useSession() as { session: string | null };

  // Este handleDelete junto con el de studentsTable podrían ser el mismo y ser importado
  async function handleDelete(): Promise<void> {
    const { data, error } = await supabase
      .from("students")
      .delete()
      .eq("student_id", student.student_id);
    if (error) {
      console.log(error);
      throw new Error("Error " + error.code + ": " + error.message + ".");
    }
    console.log(data);
    navigate(-1);
  }

  return (
    <div id="student">
      <div className="header">
        <h1>Student Details</h1>
        <div>
          {session && (
            <>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={() => navigate(`/students/edit/${student.student_id}`)}
              >
                Edit student
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={() => {
                  void (async () => {
                    await handleDelete();
                  })();
                }}
                style={{ marginLeft: "20px" }}
              >
                Delete student
              </Button>
            </>
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
