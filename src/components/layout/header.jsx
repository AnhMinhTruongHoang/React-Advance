import {
  BookOutlined,
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  AliwangwangFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("");

  const { user } = useContext(AuthContext);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/user"}>User</Link>,
      key: "user",
      icon: <UserAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Book</Link>,
      key: "book",
      icon: <BookOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ///////////////// show user after login
    ...(user.id
      ? [
          {
            label: `welcome - ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangFilled />,
            children: [{ label: "Logout", key: "logut" }],
          },
        ]
      : []),
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
