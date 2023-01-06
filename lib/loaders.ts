import supabase from "../config/supabaseClient";
import type { StudentType } from "../config/types";

export async function coursesLoader() {
  const { data: courses, error } = await supabase.from("courses").select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return courses;
}

export async function studentsLoader() {
  const { data: students, error } = await supabase.from("students").select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return students;
}

export async function studentsLoaderByCourse({
  params,
}: {
  params: { courseId: number };
}) {
  const { data: students, error } = await supabase
    .from("students")
    .select()
    .eq("course_id", params.courseId);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return students;
}

export async function studentLoaderById({
  params,
}: {
  params: { studentId: number };
}) {
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select()
    .eq("student_id", params.studentId);
  if (studentError) {
    console.log(studentError);
    throw new Error(
      "Error " + studentError.code + ": " + studentError.message + "."
    );
  }
  if (student[0].course_id) {
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select()
      .eq("course_id", student[0].course_id);
    if (courseError) {
      console.log(courseError);
      throw new Error(
        "Error " + courseError.code + ": " + courseError.message + "."
      );
    }
    student[0].grade = course[0].grade;
    student[0].section = course[0].section;
  } else {
    student[0].grade = null;
    student[0].section = null;
  }
  return student[0];
}

export async function coursesAndstudentsNamesLoader() {
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select();
  if (coursesError) {
    console.log(coursesError);
    throw new Error(
      "Error " + coursesError.code + ": " + coursesError.message + "."
    );
  }
  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select();
  if (studentsError) {
    console.log(studentsError);
    throw new Error(
      "Error " + studentsError.code + ": " + studentsError.message + "."
    );
  }
  return { courses, students };
}
