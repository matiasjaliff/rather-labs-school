////////// IMPORTS //////////

// Supabase client
import supabase from "../config/supabaseClient";

////////// ACTION FUNCTIONS //////////

// Create new student
export async function createNewStudent({
  last_name,
  first_name,
  middle_names,
  birth_date,
  gender,
  has_siblings,
  course_id,
  siblings_ids,
}: {
  last_name: string | undefined;
  first_name: string | undefined;
  middle_names: string | undefined;
  birth_date: string | undefined;
  gender: string | undefined;
  has_siblings: boolean;
  course_id: number | undefined;
  siblings_ids: number[];
}): Promise<void> {
  const { data: newStudent, error } = await supabase
    .from("students")
    .insert([
      {
        last_name,
        first_name,
        middle_names,
        birth_date,
        gender,
        has_siblings: siblings_ids.length ? true : false, // To prevent "true" when there are no siblings selected
        course_id,
        siblings_ids,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  const newStudentId = newStudent[0].student_id;
  if (siblings_ids.length) {
    await addSiblings(siblings_ids, newStudentId);
  }
  console.log(newStudent);
}

// Update student
export async function updateStudent({
  selectedStudentId,
  initialValues,
  last_name,
  first_name,
  middle_names,
  birth_date,
  gender,
  has_siblings,
  course_id,
  siblings_ids,
}: {
  selectedStudentId: number;
  initialValues: {
    last_name: string | undefined;
    first_name: string | undefined;
    middle_names: string;
    birth_date: string | undefined;
    gender: string | undefined;
    grade: string | undefined;
    section: string | undefined;
    course_id: number | undefined;
    has_siblings: boolean;
    siblings_ids: number[];
  };
  last_name: string | undefined;
  first_name: string | undefined;
  middle_names: string | undefined;
  birth_date: string | undefined;
  gender: string | undefined;
  has_siblings: boolean;
  course_id: number | undefined;
  siblings_ids: number[];
}): Promise<void> {
  const { data: updatedStudent, error } = await supabase
    .from("students")
    .update({
      last_name: last_name,
      first_name: first_name,
      middle_names: middle_names,
      birth_date: birth_date,
      gender: gender,
      has_siblings: siblings_ids.length ? true : false, // To prevent "true" when there are no siblings selected
      course_id: course_id,
      siblings_ids: siblings_ids,
    })
    .eq("student_id", selectedStudentId);
  if (error) {
    console.log(error);
    throw new Error("Error " + error.code + ": " + error.message + ".");
  }
  // If siblings_ids was updated...
  if (
    JSON.stringify(initialValues.siblings_ids) !== JSON.stringify(siblings_ids)
  ) {
    // Make a list of newSiblingsIds...
    const newSiblingsIds = siblings_ids.filter(
      (sibling_id) => !initialValues.siblings_ids.includes(sibling_id)
    );
    console.log(newSiblingsIds);
    // And update siblings_ids list of every new sibling...
    await addSiblings(newSiblingsIds, selectedStudentId);
    // Then make a list of notSiblingsAnymoreIds...
    const notSiblingsAnymoreIds = initialValues.siblings_ids.filter(
      (sibling_id) => !siblings_ids.includes(sibling_id)
    );
    console.log(notSiblingsAnymoreIds);
    // And update siblings_ids list of every not-sibling-anymore
    await removeSiblings(notSiblingsAnymoreIds, selectedStudentId);
  }
  console.log(updatedStudent);
}

// Add selectedStudentId to its siblings' siblings_ids lists
export async function addSiblings(
  siblings_ids: number[],
  selectedStudentId: number
) {
  // For every id of the siblings_ids list...
  for (const siblingId of siblings_ids) {
    // fetch its ownSiblingsIds list...
    const { data: ownSiblings, error: fetchError } = await supabase
      .from("students")
      .select("siblings_ids")
      .eq("student_id", siblingId);
    if (fetchError) {
      console.log(fetchError);
      throw new Error(
        "Error " + fetchError.code + ": " + fetchError.message + "."
      );
    }
    const ownSiblingsIds = ownSiblings[0].siblings_ids;
    // push the newStudentId in that list...
    ownSiblingsIds.push(selectedStudentId);
    console.log(ownSiblingsIds);
    // And update database
    const { error: updateError } = await supabase
      .from("students")
      .update({ has_siblings: true, siblings_ids: ownSiblingsIds })
      .eq("student_id", siblingId);
    if (updateError) {
      console.log(updateError);
      throw new Error(
        "Error " + updateError.code + ": " + updateError.message + "."
      );
    }
  }
}

// Remove selectedStudentId from its former siblings' siblings_ids lists
export async function removeSiblings(
  siblings_ids: number[],
  selectedStudentId: number
) {
  // For every id of the siblings_ids list...
  for (const siblingId of siblings_ids) {
    // fetch its ownSiblingsIds list...
    const { data: ownSiblings, error: fetchError } = await supabase
      .from("students")
      .select("siblings_ids")
      .eq("student_id", siblingId);
    if (fetchError) {
      console.log(fetchError);
      throw new Error(
        "Error " + fetchError.code + ": " + fetchError.message + "."
      );
    }
    const ownSiblingsIds = ownSiblings[0].siblings_ids;
    const updatedSiblingsIds = ownSiblingsIds.filter(
      (ownSiblingId) => ownSiblingId !== selectedStudentId
    );
    console.log(updatedSiblingsIds);
    // Update database
    const { error: updateError } = await supabase
      .from("students")
      .update({
        has_siblings: updatedSiblingsIds.length ? true : false,
        siblings_ids: updatedSiblingsIds,
      })
      .eq("student_id", siblingId);
    if (updateError) {
      console.log(updateError);
      throw new Error(
        "Error " + updateError.code + ": " + updateError.message + "."
      );
    }
  }
}
