import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserApi } from "../services/api.service";

////////////////////////
const UserPage = () => {
  const [userList, setUserList] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  /////////////////////// user list and reload user
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchAllUserApi(current, pageSize);
    if (res.data) {
      setUserList(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }

    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: 0, margin: 0 }}
      >
        <UserForm loadUsers={loadUsers} />
        <hr />
        <UserTable
          userList={userList}
          loadUsers={loadUsers}
          current={current}
          pageSize={pageSize}
          total={total}
        />
      </div>
    );
  };
};

export default UserPage;
