////////// IMPORTS //////////

// React Router
import { useParams } from "react-router-dom";

// Components
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import StudentForm from "../components/studentForm";

////////// COMPONENT //////////

export default function EditStudent(): JSX.Element {
  const params = useParams();

  return (
    <div id="edit-student">
      <div className="header">
        <h1>{Object.keys(params).length ? "Edit" : "New"} Student</h1>
      </div>
      <div className="details-container">
        <div className="photo-container">
          <Avatar size={200} icon={<UserOutlined />}></Avatar>
        </div>
        <div className="form-container">
          <StudentForm />
        </div>
      </div>
    </div>
  );
}
