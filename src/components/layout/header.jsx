import {
  BookOutlined,
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  AliwangwangFilled,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation(AuthContext);

  useEffect(() => {
    if (location && location.pathname) {
      ///////////// highlight NAV
      const allRoute = ["user", "books"];
      const currentRoute = allRoute.find(
        (item) => `/${item}` === location.pathname
      );
      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await logoutApi();
    if (res.data) {
      localStorage.removeItem("access+token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Logout Success !");
      navigate("/");
    }
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
            children: [
              {
                label: <span onClick={() => handleLogout()}>Logout</span>,
                key: "logut",
              },
            ],
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
