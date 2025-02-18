import { useEffect, useState } from "react";
import { Input, Button, notification, Modal } from "antd";
import { updateUserApi } from "../../services/api.service.js";

const UserUpdateModal = (props) => {
  //////////////////////////// props
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    setDataUpdate,
    dataUpdate,
    loadUsers,
  } = props;
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
    const res = await updateUserApi(id, fullName, phone);

    if (res.data) {
      notification.success({
        message: "Update User",
        description: "Updated",
      });
      resetForm();
      await loadUsers();
    } else {
      notification.error({
        message: "Error update User",
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
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
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
