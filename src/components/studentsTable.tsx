////////// IMPORTS //////////

// React Router
import { Link } from "react-router-dom";

// Providers
import { useSession } from "../providers/sessionProvider";

// Supabase client
import supabase from "../../config/supabaseClient";

// Types
import type { StudentType } from "../../config/databaseTypes";

// Components
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

////////// DEFINITIONS //////////

async function handleDelete(student_id: number): Promise<void> {
  const { data, error } = await supabase
    .from("students")
    .delete()
    .eq("student_id", student_id);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  console.log(data);
}

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
      <Space size="middle">
        <Link to={`/students/edit/${student_id}`}>Edit</Link> |
        <Link to={"/"}>
          <span
            onClick={() => {
              void (async () => {
                await handleDelete(student_id);
              })();
            }}
          >
            Delete
          </span>
        </Link>
        |<a>Remove from course</a>
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
