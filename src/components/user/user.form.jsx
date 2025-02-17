import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  ///////////////////// modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  /////////// crud api
  const handleClickBtn = async () => {
    setIsLoading(true); // Start loading
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create User",
        description: "Created",
      });
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Error Create User",
        description: JSON.stringify(res.message),
      });
    }
    setIsLoading(false); // End loading
    setIsModalOpen(false); // Close modal after request
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Table Users</h2>
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically (if needed)
          gap: "5px",
        }}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create User</Button>
        <Button>Update</Button>
        <Button>Delete</Button>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
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
            disabled={isLoading} // Disable button while loading
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;
