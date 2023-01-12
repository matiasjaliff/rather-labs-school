////////// IMPORTS //////////

// React Router
import { useLoaderData, useNavigate } from "react-router-dom";

// Types
import type { StudentType } from "../../config/databaseTypes";

// Components
import { Button } from "antd";
import StudentsFullTable from "../components/studentsFullTable";

////////// COMPONENT //////////

export default function AdminStudents(): JSX.Element {
  const students = useLoaderData() as StudentType[];
  const navigate = useNavigate();

  return (
    <div id="course">
      <div className="header">
        <h1>List of Students</h1>
        <div>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={() => navigate("/students/new")}
          >
            Add new student
          </Button>
        </div>
      </div>
      <StudentsFullTable students={students} />
    </div>
  );
}
