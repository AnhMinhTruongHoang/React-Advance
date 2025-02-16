import { Input, Button } from "antd";

const UserForm = () => {
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Full Name
          </span>
          <Input />
        </div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>Email</span>
          <Input />
        </div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Password
          </span>

          <Input.Password />
        </div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Phone Number
          </span>
          <Input />
        </div>
        <Button type="primary" style={{ width: "100%", marginTop: "10px" }}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
