import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface StudentType {
  student_id: number;
  created_at: string;
  first_name: string;
  middle_names: string;
  last_name: string;
  birth_date: string;
  gender: string;
  has_siblings: boolean;
  siblings_ids: number | null;
  course_id: number | null;
}

const columns: ColumnsType<StudentType> = [
  {
    title: "Student ID",
    dataIndex: "student_id",
    key: "student_id",
    render: (text) => <a>{text}</a>,
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
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
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
      size={"middle"}
      bordered
      pagination={false}
      columns={columns}
      dataSource={students}
    />
  );
}
