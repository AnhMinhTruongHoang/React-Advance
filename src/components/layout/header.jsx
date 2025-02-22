import {
  BookOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("");

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
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
  ];

  // Dropdown menu items
  const dropdownMenu = (
    <Menu>
      <Menu.Item key="register" icon={<UsergroupAddOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">User</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {/* Left Side Navigation Items */}
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}

      {/* Right Side Dropdown */}
      <Menu.Item key="dropdown" style={{ marginLeft: "auto" }}>
        <Dropdown overlay={dropdownMenu} trigger={["click"]}>
          <Space>
            <UserOutlined />
            Account
          </Space>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
