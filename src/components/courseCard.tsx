import { Card } from "antd";

interface CardProps {
  course: string;
  shift: string;
  occupancy: string;
}

export default function CourseCard({
  course,
  shift,
  occupancy,
}: CardProps): JSX.Element {
  return (
    <Card
      title={course}
      hoverable={true}
      bordered={false}
      headStyle={{ background: "#e3e3e3", fontSize: "x-large" }}
      bodyStyle={{
        background: "#f7f7f7",
        fontSize: "large",
        paddingBlock: "0.75rem",
      }}
      style={{ width: "360px", marginBottom: "20px", marginRight: "20px" }}
    >
      <p>Shift: {shift}</p>
      <p>Occupancy: {occupancy}</p>
    </Card>
  );
}
