import { useState } from "react";
import { Button, Form, Input } from "antd";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");

  ///////////////

  const onFinish = (Values) => {
    console.log("values", Values);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        marginTop: "250px",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        layout={formLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{ layout: formLayout }}
      >
        <Form.Item
          label="Username"
          name="username"
          style={{ marginBottom: "15px" }}
          required
        >
          <Input
            placeholder="Enter your username"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item label="Email" name="email" style={{ marginBottom: "15px" }}>
          <Input
            placeholder="Enter your email"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{ marginBottom: "15px" }}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          style={{ marginBottom: "15px" }}
        >
          <Input.Password
            placeholder="Confirm your password"
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid white",
              borderRadius: "6px",
              backgroundColor: "lightblue",
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
