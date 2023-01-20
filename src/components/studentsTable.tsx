////////// IMPORTS //////////

// React Router
import { Form, Link } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";

// Types
import type { StudentType } from "../../config/databaseTypes";

// Components
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

////////// DEFINITIONS //////////

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
    title: "Middle Names",
    dataIndex: "middle_names",
    key: "middle_names",
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
];

const columnsAdmin: ColumnsType<StudentType> = [
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
    title: "Middle Names",
    dataIndex: "middle_names",
    key: "middle_names",
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
    dataIndex: "student_id",
    key: "actions",
    width: "320px",
    align: "center",
    render: (student_id: number) => (
      <Space size="small">
        <Button type="link" size="small" href={`/students/${student_id}/edit`}>
          Edit
        </Button>
        |
        <Form method="post" action={`/students/${student_id}/delete`}>
          <input
            name="origin"
            hidden
            readOnly
            value={location.pathname}
          ></input>
          <Button type="link" size="small" htmlType="submit">
            Delete
          </Button>
        </Form>
        |
        <Button type="link" size="small">
          Remove from course
        </Button>
      </Space>
    ),
  },
];

////////// COMPONENT //////////

export default function StudentsTable({
  students,
}: {
  students: StudentType[];
}): JSX.Element {
  const { session } = useSession() as { session: string | null };

  return (
    <Table
      rowKey={(students) => students.student_id}
      size={"middle"}
      bordered
      pagination={false}
      columns={!session ? columns : columnsAdmin}
      dataSource={students}
    />
  );
}
