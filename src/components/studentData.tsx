////////// IMPORTS //////////

// React Router
import { Link } from "react-router-dom";

// Types
import type { StudentType, CourseType } from "../../config/databaseTypes";

// Components
import { Descriptions } from "antd";

////////// COMPONENT //////////

export default function StudentData({
  student,
  siblings,
  course,
}: {
  student: StudentType;
  siblings: StudentType[];
  course: CourseType | null;
}): JSX.Element {
  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="Student ID">
        {student.student_id}
      </Descriptions.Item>
      <Descriptions.Item label="Grade">
        {course?.grade || "Unassigned"}
      </Descriptions.Item>
      <Descriptions.Item label="Section">
        {course?.section || "Unassigned"}
      </Descriptions.Item>
      <Descriptions.Item label="Last Name">
        {student.last_name}
      </Descriptions.Item>
      <Descriptions.Item label="First Name">
        {student.first_name}
      </Descriptions.Item>
      <Descriptions.Item label="Middle Names">
        {student.middle_names}
      </Descriptions.Item>
      <Descriptions.Item label="Birth Date">
        {student.birth_date}
      </Descriptions.Item>
      <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
      <Descriptions.Item label="Has siblings in the school?">
        {student.has_siblings ? "Yes" : "No"}
      </Descriptions.Item>
      {student.has_siblings ? (
        <Descriptions.Item label="Siblings" span={3}>
          {siblings.map((sibling) => (
            <Link
              to={`/students/${sibling.student_id}`}
              key={sibling.student_id}
            >
              <p>{`${sibling.last_name}, ${sibling.first_name} ${sibling.middle_names}`}</p>
            </Link>
          ))}
        </Descriptions.Item>
      ) : (
        <></>
      )}
    </Descriptions>
  );
}
