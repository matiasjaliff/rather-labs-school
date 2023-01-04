import { Descriptions } from "antd";
import type { StudentType } from "../../config/types";

export default function StudentData({
  student,
}: {
  student: StudentType;
}): JSX.Element {
  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="Student ID">
        {student.student_id}
      </Descriptions.Item>
      <Descriptions.Item label="Grade">{"GRADE"}</Descriptions.Item>
      <Descriptions.Item label="Section">{"SECTION"}</Descriptions.Item>
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
      <Descriptions.Item label="Siblings" span={3}>
        {student.has_siblings ? "-" : "None"}
      </Descriptions.Item>
    </Descriptions>
  );
}
