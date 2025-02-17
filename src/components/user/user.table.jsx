import { Table } from "antd";

const UserTable = (props) => {
  const { userList } = props;
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
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
    </div>
  );
};

export default UserTable;
