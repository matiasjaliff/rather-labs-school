////////// IMPORTS //////////

// React Router
import { useLoaderData, useNavigate } from "react-router-dom";

// Providers
import { useSelectionsUpdate } from "../providers/selectionsProvider";

// Types
import type { CourseType } from "../../config/databaseTypes";

// Components
import CourseCard from "../components/courseCard";

////////// COMPONENT //////////

export default function Index(): JSX.Element {
  const courses = useLoaderData() as CourseType[];
  const navigate = useNavigate();

  const { setSelectedCourse } = useSelectionsUpdate() as {
    setSelectedCourse: (course: CourseType) => void;
  };

  function handleClick(course: CourseType) {
    setSelectedCourse(course);
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
