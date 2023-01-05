import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { StudentType } from "../../config/types";

const columns: ColumnsType<StudentType> = [
  {
    title: "Student ID",
    dataIndex: "student_id",
    key: "student_id",
    width: "100px",
    align: "center",
    render: (text: number) => <Link to={`/students/${text}`}>{text}</Link>,
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Middle Name",
    dataIndex: "middle_name",
    key: "middle_name",
  },
  {
    title: "Birth Date",
    dataIndex: "birth_date",
    key: "birth_date",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Actions",
    key: "actions",
    width: "320px",
    align: "center",
    render: () => (
      <Space size="middle">
        <a>Edit</a> |<a>Delete</a> |<a>Remove from course</a>
      </Space>
    ),
  },
];

export default function StudentsTable({
  students,
}: {
  students: StudentType[];
}): JSX.Element {
  return (
    <Table
      rowKey={(students) => students.student_id}
      size={"middle"}
      bordered
      pagination={false}
      columns={columns}
      dataSource={students}
    />
  );
}
