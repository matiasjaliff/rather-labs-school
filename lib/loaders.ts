import supabase from "../config/supabaseClient";

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
  const { data: student, error } = await supabase
    .from("students")
    .select()
    .eq("student_id", params.studentId);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return student[0];
}
