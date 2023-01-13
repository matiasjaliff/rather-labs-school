////////// IMPORTS //////////

// React and React Router
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

// Dates management library
import dayjs from "dayjs";

// Supabase client
import supabase from "../../config/supabaseClient";

// Types
import type { CourseType, StudentType } from "../../config/databaseTypes";

// Actions
import { addSiblings, removeSiblings } from "../../lib/actions";

// Components
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";

////////// COMPONENT //////////

export default function StudentForm(): JSX.Element {
  const params = useParams();
  const { courses, students } = useLoaderData() as {
    courses: CourseType[];
    students: StudentType[];
  };
  const navigate = useNavigate();

  const selectedStudentId = Number(params.studentId);
  const studentsNamesList = students
    .filter((student) => student.student_id !== selectedStudentId)
    .map((student) => ({
      value: student.student_id,
      label: `${student.last_name}, ${student.first_name} ${student.middle_names}`,
    }));

  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";

  const selectedStudent: StudentType | null = !isNaN(selectedStudentId)
    ? students.filter((student) => student.student_id === selectedStudentId)[0]
    : null;

  const selectedStudentCourse: CourseType | null = !isNaN(selectedStudentId)
    ? courses.filter(
        (course) => course.course_id === selectedStudent?.course_id
      )[0]
    : null;

  // Initial values
  const initialValues = {
    last_name: selectedStudent?.last_name || undefined,
    first_name: selectedStudent?.first_name || undefined,
    middle_names: selectedStudent?.middle_names || "",
    birth_date: selectedStudent?.birth_date || undefined,
    gender: selectedStudent?.gender || undefined,
    grade: selectedStudentCourse?.grade || undefined,
    section: selectedStudentCourse?.section || undefined,
    course_id: selectedStudent?.course_id || undefined,
    has_siblings: selectedStudent?.has_siblings || false,
    siblings_ids: selectedStudent?.siblings_ids || [],
  };

  // Form states
  const [last_name, setLastName] = useState(initialValues.last_name);
  const [first_name, setFirstName] = useState(initialValues.first_name);
  const [middle_names, setMiddleNames] = useState(initialValues.middle_names);
  const [birth_date, setBirthDate] = useState(initialValues.birth_date);
  const [gender, setGender] = useState(initialValues.gender);
  const [grade, setGrade] = useState(initialValues.grade);
  const [section, setSection] = useState(initialValues.section);
  const [course_id, setCourseId] = useState(initialValues.course_id);
  const [has_siblings, setHasSiblings] = useState(initialValues.has_siblings);
  const [siblings_ids, setSiblingsIds] = useState(initialValues.siblings_ids);

  ////////// GRADE AND SECTION DROPDOWN SELECTORS MANAGEMENT //////////

  // List states to use in dropdown selectors
  const [gradesList, setGradesList] = useState([""]);
  const [sectionsList, setSectionsList] = useState([""]);

  // Grades list generator
  useEffect(() => {
    const availableGrades: string[] = [];
    courses.forEach((course) => {
      if (!availableGrades.includes(course.grade))
        availableGrades.push(course.grade);
    });
    setGradesList(availableGrades);
  }, []);

  // Available sections list generator (depends on selected grade)
  useEffect(() => {
    const availableSections: string[] = courses
      .filter((course) => course.grade === grade)
      .map((course) => course.section);
    setSectionsList(availableSections);
    setCourseId(undefined);
  }, [grade]);

  // Course id finder (depends on selected grade and course)
  useEffect(() => {
    if (section) {
      const selectedCourseId = courses.filter(
        (course) => course.grade === grade && course.section === section
      )[0].course_id;
      setCourseId(selectedCourseId);
    } else {
      setCourseId(undefined);
    }
  }, [section]);

  ////////// HANDLERS //////////

  // Resetter
  function handleReset(): void {
    form.resetFields();
    setLastName(initialValues.last_name);
    setFirstName(initialValues.first_name);
    setMiddleNames(initialValues.middle_names);
    setBirthDate(initialValues.birth_date);
    setGender(initialValues.gender);
    setGrade(initialValues.grade);
    setSection(initialValues.section);
    setCourseId(initialValues.course_id);
    setHasSiblings(initialValues.has_siblings);
    setSiblingsIds(initialValues.siblings_ids);
  }

  // Creator
  async function handleCreate() {
    // Insert row with new student data
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
    navigate("/");
  }

  // Updater
  async function handleUpdate() {
    // Update student data
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
      JSON.stringify(initialValues.siblings_ids) !==
      JSON.stringify(siblings_ids)
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
    navigate("/");
  }

  return (
    <Form
      form={form}
      name="student-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      labelWrap={true}
      initialValues={{
        remember: true,
        last_name: initialValues.last_name,
        first_name: initialValues.first_name,
        middle_names: initialValues.middle_names,
        birth_date: (() => {
          return !isNaN(selectedStudentId)
            ? dayjs(selectedStudent?.birth_date, dateFormat)
            : undefined;
        })(),
        gender: initialValues.gender,
        grade: initialValues.grade,
        section: initialValues.section,
        has_siblings: initialValues.has_siblings,
        siblings_ids: initialValues.siblings_ids,
      }}
      autoComplete="off"
      size="large"
      method="post"
      onFinish={() => {
        void (async () => {
          if (!isNaN(selectedStudentId)) {
            await handleUpdate();
          } else {
            await handleCreate();
          }
        })();
      }}
    >
      <div className="full-form" style={{ display: "flex" }}>
        <div
          className="personal-information"
          style={{ flexBasis: "50%", paddingRight: "40px" }}
        >
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Middle Names" name="middle_names">
            <Input
              placeholder="Enter middle names"
              onChange={(e) => setMiddleNames(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birth_date"
            rules={[{ required: true, message: "Please select birth date" }]}
          >
            <DatePicker
              format={dateFormat}
              onChange={(date, dateString) => setBirthDate(dateString)}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Select gender" onChange={setGender}>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div
          className="school-information"
          style={{ flexBasis: "50%", paddingRight: "0px" }}
        >
          <Form.Item label="Grade" name="grade">
            <Select
              placeholder="Select grade"
              onChange={(value: string) => {
                setGrade(value);
                setSection(undefined);
                form.resetFields(["section"]);
              }}
              allowClear
            >
              {gradesList.map((grade) => (
                <Select.Option key={grade} value={grade}>
                  {grade}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Section" name="section">
            <Select
              placeholder="Select section"
              onChange={setSection}
              allowClear
            >
              {sectionsList.map((section) => (
                <Select.Option key={section} value={section}>
                  {section}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Has siblings at school?"
            name="has_siblings"
            valuePropName="checked"
          >
            <Checkbox
              onChange={() => {
                if (has_siblings) {
                  form.setFieldValue("siblings_ids", []);
                  setSiblingsIds([]);
                }
                setHasSiblings(!has_siblings);
              }}
            ></Checkbox>
          </Form.Item>

          <Form.Item label="Siblings" name="siblings_ids">
            <Select
              disabled={!has_siblings}
              mode="multiple"
              allowClear
              placeholder="Select students"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={studentsNamesList}
              onChange={(value: string[]) =>
                setSiblingsIds(value.map((id) => parseInt(id)))
              }
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item wrapperCol={{ offset: 0 }} style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          {!isNaN(selectedStudentId) ? "Update" : "Submit"}
        </Button>
        <Button
          htmlType="button"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
