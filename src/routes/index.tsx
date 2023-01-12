////////// IMPORTS //////////

// React Router
import { useLoaderData, useNavigate } from "react-router-dom";

// Types
import type { CourseType } from "../../config/databaseTypes";

// Components
import CourseCard from "../components/courseCard";

////////// COMPONENT //////////

export default function Index(): JSX.Element {
  const courses = useLoaderData() as CourseType[];
  const navigate = useNavigate();

  return (
    <div id="courses">
      <h1>Available Courses</h1>
      <div>
        {courses.map((course) => (
          <div
            key={course.course_id}
            onClick={() => navigate(`/courses/${course.course_id}`)}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}
