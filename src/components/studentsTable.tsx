import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { StudentType } from "../../config/types";
import { useSession } from "../providers/sessionProvider";
import supabase from "../../config/supabaseClient";

async function handleDelete(student_id: number) {
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
        <a
          href={"/"}
          onClick={() => {
            void (async () => {
              await handleDelete(student_id);
            })();
          }}
        >
          Delete
        </a>
        |<a>Remove from course</a>
      </Space>
    ),
  },
];

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
