import {
  EditFilled,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import StudentsTable from "../components/studentsTable";

export default function Course(): JSX.Element {
  return (
    <div id="course">
      <div className="header">
        <h1>Course 1º A</h1>
        <div>
          <EditFilled className="icon" />
          <LeftCircleFilled className="icon" />
          <RightCircleFilled className="icon" />
        </div>
      </div>
      <ul>
        <li>Shift: Morning</li>
        <li>Occupancy: 12/20</li>
      </ul>
      <h2>List of students</h2>
      <StudentsTable />
    </div>
  );
}
