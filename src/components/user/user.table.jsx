import { notification, Popconfirm, Table } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import UserUpdateModal from "./user.UpdateModal";
import { useState } from "react";
import UserViewDetail from "./user.viewDetail";
import { deleteUserApi } from "../../services/api.service";
///////////////
const UserTable = (props) => {
  const { userList, loadUsers, current, pageSize, total } = props;

  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataUser, setDataUser] = useState(null);

  const handleDeleteUser = async (id) => {
    const res = await deleteUserApi(id);

    if (res.data) {
      notification.success({
        message: "Deleted",
        description: "deleted",
      });
      await loadUsers();
    } else {
      notification.error({
        message: "Error delete User",
        description: JSON.stringify(res.message),
      });
    }
  };

  const columns = [
    {
      title: "Order ",
      render: (_, record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={(e) => {
              setDataUser(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
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
            onClick={(e) => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "yellow" }}
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn xóa user này ?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteFilled style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
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
      width: "100%",
      height: "70vh",
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
          // pagination={{
          //   current: current,
          //   pageSize: pageSize,
          //   showSizeChanger: true,
          //   total: total,
          //   showTotal: (total, range) => {
          //     return (
          //       <div>
          //         {range[0]}-{range[1]} trên {total} rows
          //       </div>
          //     );
          //   },
          // }}
        />
      </div>
      <UserUpdateModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUsers={loadUsers}
      />
      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        loadUsers={loadUsers}
        dataUser={dataUser}
        setDataUser={setDataUser}
      />
    </div>
  );
};

export default UserTable;
