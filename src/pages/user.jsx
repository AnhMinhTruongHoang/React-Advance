import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserApi } from "../services/api.service";

////////////////////////
const UserPage = () => {
  const [userList, setUserList] = useState([]);

  /////////////////////// user list
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let res = await fetchAllUserApi();
    setUserList(res.data);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 0, margin: 0 }}
    >
      <UserForm loadUsers={loadUsers} />
      <hr />
      <UserTable userList={userList} loadUsers={loadUsers} />
    </div>
  );
};

export default UserPage;
