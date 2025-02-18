import { useEffect, useState } from "react";
import { Input, Button, notification, Modal } from "antd";
import { createUserApi } from "../../services/api.service.js";

const UserUpdateModal = (props) => {
  //////////////////////////// props
  const { isModalUpdateOpen, setIsModalUpdateOpen, setDataUpdate, dataUpdate } =
    props;
  ////////////////////////////
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

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
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Create User"
      open={isModalUpdateOpen}
      onOk={() => setIsModalUpdateOpen(false)}
      onCancel={() => resetForm()}
      footer={[]}
    >
      <div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>Id</span>
          <Input value={id} disabled />
        </div>

        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Full Name
          </span>
          <Input
            required
            value={fullName}
            onChange={(event) => setfullName(event.target.value)}
          />
        </div>
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
    </Modal>
  );
};

export default UserUpdateModal;
