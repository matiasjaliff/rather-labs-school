import { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";

export default function StudentForm(): JSX.Element {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";

  const [hasSiblings, setHasSiblings] = useState(false);

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
            <Select placeholder="Select grade">
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Section" name="section">
            <Select placeholder="Select section">
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Has siblings at school?" name="has_siblings">
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
