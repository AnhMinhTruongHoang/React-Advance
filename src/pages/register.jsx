import { Button, Col, Input, notification, Row, Form } from "antd";
import { registerApi } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await registerApi(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );

    if (res.data) {
      notification.success({
        message: "Success!",
        description: "Registration successful.",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Failure!",
        description: "Registration failed.",
      });
    }

    console.log("values", values);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name" },
                { min: 3, message: "Full name must be at least 3 characters" },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number" },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: "Phone number must be between 10 to 15 digits",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" maxLength={15} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={() => form.submit()}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  backgroundColor: "lightblue",
                }}
              >
                Register
              </Button>
            </Form.Item>
            <Link
              to={"/login"}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <i>Login</i>
            </Link>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
