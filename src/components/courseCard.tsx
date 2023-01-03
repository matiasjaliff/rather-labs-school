import { Card } from "antd";

interface CardProps {
  grade: string;
  section: string;
  shift: string;
  capacity: string;
}

export default function CourseCard({
  grade,
  section,
  shift,
  capacity,
}: CardProps): JSX.Element {
  return (
    <Card
      title={`${grade}º ${section}`}
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
      <p>Shift: {shift}</p>
      <p>Capacity: {capacity}</p>
    </Card>
  );
}
