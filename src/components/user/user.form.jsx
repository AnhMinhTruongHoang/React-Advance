import { Input, Button, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

/////////////////////////
const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  /////////// crud api
  const handleClickBtn = async () => {
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create User",
        description: "Created",
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginTop: "100px",
        marginBottom: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Full Name
          </span>
          <Input
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
    </div>
  );
};

export default UserForm;
