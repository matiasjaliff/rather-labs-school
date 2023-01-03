import CourseCard from "../components/courseCard";

export default function Index(): JSX.Element {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h1>Available Courses</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <CourseCard course={"1º A"} shift={"Morning"} occupancy={"12/20"} />
        <CourseCard course={"1º B"} shift={"Morning"} occupancy={"12/20"} />
        <CourseCard course={"1º C"} shift={"Afternoon"} occupancy={"12/20"} />
      </div>
    </div>
  );
}
