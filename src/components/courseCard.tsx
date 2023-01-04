import { Card } from "antd";
import type { CourseType } from "../../config/types";

export default function CourseCard({
  course,
}: {
  course: CourseType;
}): JSX.Element {
  return (
    <Card
      title={`${course.grade}º ${course.section}`}
      hoverable={true}
      bordered={false}
      headStyle={{
        background: "#e3e3e3",
        fontSize: "x-large",
      }}
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
