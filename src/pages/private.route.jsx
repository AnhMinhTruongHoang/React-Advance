import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return <>{props.children}</>;
  }

  return (
    <Result
      status="404"
      title=" Unauthorize !"
      subTitle={"You need login to access !"}
      extra={
        <Button type="primary">
          <Link to="/login">
            <span>Login</span>
          </Link>
        </Button>
      }
    />
  );
};

export default PrivateRoute;
