import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import ActionButtons from "./Sections/ActionButtons";
import Chatbot from "../Ctatbot/Chatbot";

const { Header } = Layout;
const { SubMenu } = Menu;

function NavBar({ history }) {
  const [openChatbot, setOpenChatbot] = useState(false);
  const user = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.user.userData);

  const onClick = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        history.push("/login");
      } else {
        alert("failed logout");
      }
    });
  };

  const toggleChatbot = () => {
    setOpenChatbot((prev) => !prev);
  };

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item style={{ float: "left" }} key="logo">
          <NavLink to="/">Jangala</NavLink>
        </Menu.Item>
        {isAuth ? (
          <>
            <SubMenu
              style={{ float: "right" }}
              key="profile"
              title={user.userData.name}
            >
              <Menu.Item key="1">
                <NavLink to="/profile">Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="2" onClick={onClick}>
                <span>Logout</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item style={{ float: "right" }} key="cart">
              <NavLink to="/user/cart">
                {`CART (${user.userData.cart?.length})`}
              </NavLink>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="signIn" style={{ float: "right" }}>
              <NavLink to="/login">SIGN IN</NavLink>
            </Menu.Item>
            <Menu.Item key="sighUp" style={{ float: "right" }}>
              <NavLink to="/register">SIGN UP</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
      {isAuth && openChatbot && <Chatbot onClickOutside={toggleChatbot} />}
      {isAuth && <ActionButtons actions={toggleChatbot} />}
    </Header>
  );
}

export default withRouter(NavBar);
