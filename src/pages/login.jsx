import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/api.service";

const LoginPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  ///////////////////

  const onFinish = async (values) => {
    const res = await loginApi(values.email, values.password);
    if (res.data) {
      notification.success({
        message: "Login success !",
        description: "Login success",
      });
      navigate("/");
      console.log("Success:", values);
    } else {
      notification.error({
        message: "Login failed !",
        description: "Login failed",
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
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
              Submit
            </Button>
            <Link
              to={"/register"}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              Register
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
