import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import type { CourseType, StudentType } from "../../config/types";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import supabase from "../../config/supabaseClient";

export default function StudentForm(): JSX.Element {
  const params = useParams();
  console.log(params);
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const { courses, students } = useLoaderData() as {
    courses: CourseType[];
    students: StudentType[];
  };
  const studentsNamesList = students.map((student) => ({
    value: student.student_id,
    label: `${student.last_name}, ${student.first_name} ${student.middle_names}`,
  }));
  const navigate = useNavigate();

  // Form states

  const [last_name, setLastName] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [middle_names, setMiddleNames] = useState<string>("");
  const [birth_date, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const [section, setSection] = useState<string | undefined>(undefined);
  const [course_id, setCourseId] = useState<number | undefined>(undefined);
  const [has_siblings, setHasSiblings] = useState(false);
  const [siblings_ids, setSiblingsIds] = useState<number[] | undefined>(
    undefined
  );

  // List states to use in dropdown selectors

  const [gradesList, setGradesList] = useState([""]);
  const [sectionsList, setSectionsList] = useState([""]);

  // Effects and handler to populate list states

  useEffect(() => {
    const grades: string[] = [];
    courses.forEach((course) => {
      if (!grades.includes(course.grade)) grades.push(course.grade);
    });
    setGradesList(grades);
  }, []);

  useEffect(() => {
    const sections: string[] = courses
      .filter((course) => course.grade === grade)
      .map((course) => course.section);
    setSectionsList(sections);
  }, [grade]);

  useEffect(() => {
    const courseId = courses.filter(
      (course) => course.grade === grade && course.section === section
    );
    if (section) setCourseId(courseId[0].course_id);
  }, [section]);

  // Submitter

  async function handleSubmit(): Promise<void> {
    console.log("Entrando");
    const { data, error } = await supabase.from("students").insert([
      {
        last_name,
        first_name,
        middle_names,
        birth_date,
        gender,
        has_siblings,
        course_id,
        siblings_ids,
      },
    ]);
    if (error) {
      console.log(error);
      throw new Error("Error " + error.code + ": " + error.message + ".");
    }
    console.log(data);
    navigate("/");
  }

  return (
    <Form
      form={form}
      name="student-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      labelWrap={true}
      initialValues={{ remember: true }}
      autoComplete="off"
      size="large"
      method="post"
      onFinish={() => {
        void (async () => {
          await handleSubmit();
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
                form.resetFields(["section"]);
                setGrade(value);
                setSection(undefined);
              }}
            >
              {gradesList.map((grade) => (
                <Select.Option key={grade} value={grade}>
                  {grade}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Section" name="section">
            <Select placeholder="Select section" onChange={setSection}>
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
            <Checkbox onChange={() => setHasSiblings(!has_siblings)}></Checkbox>
          </Form.Item>

          <Form.Item label="Siblings" name="siblings">
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
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={() => form.resetFields()}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
