import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";
import { UserAddOutlined } from "@ant-design/icons";

const UserForm = (props) => {
  const { loadUsers } = props;
  //////////////////////
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  ///////////////////// modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  /////////// crud api
  const handleClickBtn = async () => {
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create User",
        description: "Created",
      });
      resetForm();
      await loadUsers();
    } else {
      notification.error({
        message: "Error Create User",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <>
      <h2
        style={{ textAlign: "center", marginTop: "55px", color: "greenyellow" }}
      >
        Table Users
      </h2>
      <div
        style={{
          marginTop: "25px",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically (if needed)
          gap: "5px",
        }}
      >
        <UserAddOutlined
          style={{ fontSize: "30px", cursor: "pointer", color: "blue" }}
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </UserAddOutlined>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => resetForm()}
        footer={[]}
      >
        <div>
          <div>
            <span style={{ display: "block", marginBottom: "5px" }}>
              Full Name
            </span>
            <Input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div>
            <span style={{ display: "block", marginBottom: "5px" }}>Email</span>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <span style={{ display: "block", marginBottom: "5px" }}>
              Password
            </span>
            <Input.Password
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <span style={{ display: "block", marginBottom: "5px" }}>
              Phone Number
            </span>
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <Button
            onClick={handleClickBtn}
            type="primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;
