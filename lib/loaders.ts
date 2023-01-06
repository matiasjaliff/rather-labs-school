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
    console.log(course);
    student[0].grade = course[0].grade;
    student[0].section = course[0].section;
  } else {
    student[0].grade = null;
    student[0].section = null;
  }
  console.log(student[0]);
  return student[0];
}
