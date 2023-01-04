import { Card } from "antd";

interface CourseCardProps {
  course: {
    course_id: number;
    created_at: string;
    grade: string;
    section: string;
    shift: string;
    capacity: number;
  };
}

export default function CourseCard({ course }: CourseCardProps): JSX.Element {
  return (
    <Card
      title={`${course.grade}º ${course.section}`}
      hoverable={true}
      bordered={false}
      headStyle={{ background: "#e3e3e3", fontSize: "x-large" }}
      bodyStyle={{
        background: "#f7f7f7",
        fontSize: "large",
        paddingBlock: "0.75rem",
      }}
      style={{ width: "340px", marginBottom: "20px", marginRight: "20px" }}
    >
      <p>Shift: {course.shift}</p>
      <p>Capacity: {course.capacity}</p>
    </Card>
  );
}
