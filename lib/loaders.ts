////////// IMPORTS //////////

// Supabase client
import supabase from "../config/supabaseClient";

////////// LOADER FUNCTIONS //////////

// Load all courses
export async function allCoursesLoader() {
  const { data: courses, error } = await supabase.from("courses").select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return courses;
}

// Load all students
export async function allStudentsLoader() {
  const { data: students, error } = await supabase.from("students").select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  return students;
}

// Load all courses and all students
export async function allCoursesAndAllStudentsLoader() {
  const courses = await allCoursesLoader();
  const students = await allStudentsLoader();
  return { courses, students };
}

// Load course by id
export async function courseLoaderById(courseId: number) {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select()
    .eq("course_id", courseId);
  if (courseError) {
    console.log(courseError);
    throw new Error(
      "Error " + courseError.code + ": " + courseError.message + "."
    );
  }
  return course[0];
}

// Load course and all students in that course
export async function oneCourseAndItsStudentsLoader({
  params,
}: {
  params: any;
}) {
  const course = await courseLoaderById(params.courseId);
  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select()
    .eq("course_id", params.courseId);
  if (studentsError) {
    console.log(studentsError);
    throw new Error(
      "Error " + studentsError.code + ": " + studentsError.message + "."
    );
  }
  return { course: course, students: students };
}

// Load student by id
export async function studentLoaderById({ params }: { params: any }) {
  const students = await allStudentsLoader();
  const selectedStudent = students.filter(
    (student) => student.student_id === Number(params.studentId)
  )[0];
  const siblingsList = selectedStudent.siblings_ids?.map(
    (siblingId) =>
      students.filter((student) => student.student_id === siblingId)[0]
  );
  const course = selectedStudent.course_id
    ? await courseLoaderById(selectedStudent.course_id)
    : null;
  return {
    student: selectedStudent,
    siblings: siblingsList,
    course: course,
  };
}
