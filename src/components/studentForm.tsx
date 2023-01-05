import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { CourseType } from "../../config/types";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import supabase from "../../config/supabaseClient";

export default function StudentForm(): JSX.Element {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const courses = useLoaderData() as CourseType[];
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
    const { data, error } = await supabase.from("students").insert([
      {
        last_name,
        first_name,
        middle_names,
        birth_date,
        gender,
        has_siblings,
        course_id,
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
      onFinish={() => handleSubmit}
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
            <Select
              placeholder="Select gender"
              onChange={(value: string) => setGender(value)}
            >
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
            <Select
              placeholder="Select section"
              onChange={(value: string) => setSection(value)}
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
            <Checkbox onChange={() => setHasSiblings(!has_siblings)}></Checkbox>
          </Form.Item>

          <Form.Item label="Sibling" name="sibling-1">
            <Select
              disabled={!has_siblings}
              showSearch
              placeholder="Select student"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Sibling" name="sibling-2">
            <Select
              disabled={!has_siblings}
              showSearch
              placeholder="Select student"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
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
