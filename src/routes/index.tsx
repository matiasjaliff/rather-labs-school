import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelectionsUpdate } from "../providers/selectionsProvider";
import type { CourseType } from "../../config/types";
import CourseCard from "../components/courseCard";

export default function Index(): JSX.Element {
  const courses = useLoaderData() as CourseType[];
  const { handleCourseSelection } = useSelectionsUpdate() as {
    handleCourseSelection: (course: CourseType) => void;
  };
  const navigate = useNavigate();

  function handleClick(course: CourseType) {
    handleCourseSelection(course);
    navigate(`/courses/${course.course_id}`);
  }

  return (
    <div id="courses">
      <h1>Available Courses</h1>
      <div>
        {courses.map((course) => (
          <div key={course.course_id} onClick={() => handleClick(course)}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}
