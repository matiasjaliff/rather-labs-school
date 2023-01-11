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

export async function studentsLoaderByCourse({ params }: { params: any }) {
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

export async function studentLoaderById({ params }: { params: any }) {
  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select();
  if (studentsError) {
    console.log(studentsError);
    throw new Error(
      "Error " + studentsError.code + ": " + studentsError.message + "."
    );
  }
  const selectedStudent = students.filter(
    (student) => student.student_id === Number(params.studentId)
  )[0];
  const siblingsList = selectedStudent.siblings_ids?.map(
    (siblingId) =>
      students.filter((student) => student.student_id === siblingId)[0]
  );
  if (selectedStudent.course_id) {
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select()
      .eq("course_id", selectedStudent.course_id);
    if (courseError) {
      console.log(courseError);
      throw new Error(
        "Error " + courseError.code + ": " + courseError.message + "."
      );
    }
    return {
      student: selectedStudent,
      siblings: siblingsList,
      course: course[0],
    };
  } else {
    return { student: selectedStudent, siblings: siblingsList };
  }
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
