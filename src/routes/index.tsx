import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelectionsUpdate } from "../selectionsProvider";
import type { CourseType } from "../../config/types";
import supabase from "../../config/supabaseClient";
import CourseCard from "../components/courseCard";

export async function loader() {
  const { data: courses, error } = await supabase.from("courses").select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return courses;
}

export default function Index(): JSX.Element {
  const courses = useLoaderData() as CourseType[];
  const { handleCourseSelection } = useSelectionsUpdate() as {
    handleCourseSelection: CourseType;
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
