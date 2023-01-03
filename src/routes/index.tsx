import React from "react";
import { useLoaderData } from "react-router-dom";

import supabase from "../../config/supabaseClient";

import CourseCard from "../components/courseCard";

export async function loader() {
  const { data: courses, error } = await supabase.from("courses").select();
  if (error) {
    throw new Error(error.message);
  }
  return { courses, error };
}

export default function Index(): JSX.Element {
  // To properly cast useLoaderData and get types from loader, refer to the following:
  // www.typescriptlang.org/docs/handbook/2/typeof-types.html
  // www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
  const { courses } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div id="courses">
      <h1>Available Courses</h1>
      <div>
        {courses.map((course) => {
          return (
            <CourseCard
              key={course.course_id}
              grade={course.grade}
              section={course.section}
              shift={course.shift}
              capacity={`${course.capacity}`}
            />
          );
        })}
      </div>
    </div>
  );
}
