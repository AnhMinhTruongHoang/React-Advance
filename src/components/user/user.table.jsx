import { Table } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import UserUpdateModal from "./user.UpdateModal";
import { useState } from "react";

const UserTable = (props) => {
  const { userList, loadUsers } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return <a href="#">{record._id}</a>;
      },
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "yellow" }}
          />
          <DeleteFilled style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  // Full-screen styles
  const styles = {
    container: {
      width: "100vw", // Full width
      height: "100vh", // Full height
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      boxSizing: "border-box",
    },
    tableTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333",
    },
    button: {
      backgroundColor: "#1677ff",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s",
      marginBottom: "15px",
    },
    tableContainer: {
      width: "100%", // Makes table fit the screen width
      height: "70vh", // Ensures table takes up most of the screen
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
      padding: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={userList}
          rowKey={"_id"}
          pagination={{ pageSize: 10 }}
        />
      </div>
      <UserUpdateModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUsers={loadUsers}
      />
    </div>
  );
};

export default UserTable;
