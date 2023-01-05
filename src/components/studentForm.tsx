import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import type { CourseType } from "../../config/types";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";

export default function StudentForm(): JSX.Element {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";

  const courses = useLoaderData() as CourseType[];

  const [gradesList, setGradesList] = useState([""]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [sectionsList, setSectionsList] = useState([""]);
  const [hasSiblings, setHasSiblings] = useState(false);

  useEffect(() => {
    const grades: string[] = [];
    courses.forEach((course) => {
      if (!grades.includes(course.grade)) grades.push(course.grade);
    });
    setGradesList(grades);
  }, []);

  useEffect(() => {
    const sections: string[] = courses
      .filter((course) => course.grade === selectedGrade)
      .map((course) => course.section);
    setSectionsList(sections);
  }, [selectedGrade]);

  const handleGradeChange = (value: string) => {
    form.resetFields(["section"]);
    setSelectedGrade(value);
  };

  const toggleHasSiblings = () => {
    setHasSiblings(!hasSiblings);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onReset = () => {
    form.resetFields();
  };

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
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item label="Middle Names" name="middle_names">
            <Input placeholder="Enter middle names" />
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birth_date"
            rules={[{ required: true, message: "Please select birth date" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Select gender">
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
            <Select placeholder="Select grade" onChange={handleGradeChange}>
              {gradesList.map((grade) => (
                <Select.Option key={grade} value={grade}>
                  {grade}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Section" name="section">
            <Select placeholder="Select section">
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
            <Checkbox onChange={toggleHasSiblings}></Checkbox>
          </Form.Item>

          <Form.Item label="Sibling" name="sibling-1">
            <Select
              disabled={!hasSiblings}
              showSearch
              placeholder="Select student"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
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
              disabled={!hasSiblings}
              showSearch
              placeholder="Select student"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
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
          onClick={onReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
