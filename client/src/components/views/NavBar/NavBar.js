import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import ChatbotButton from "./Sections/ChatbotButton";

const { Header } = Layout;

function NavBar({ history }) {
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

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="1" onClick={onClick}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item style={{ float: "left" }} key="logo">
            <Link to="/">Jangala</Link>
          </Menu.Item>
          {isAuth ? (
            <>
              <Menu.Item style={{ float: "right" }} key="profile">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{user.userData.name}</span>
                  </div>
                </Dropdown>
              </Menu.Item>
              <Menu.Item style={{ float: "right" }} key="cart">
                <Link to="/user/cart">
                  {`CART (${user.userData.cart?.length})`}
                </Link>
              </Menu.Item>
              <Menu.Item style={{ float: "right" }} key="upload">
                <Link to="/product/upload">SELL</Link>
              </Menu.Item>
              <ChatbotButton />
            </>
          ) : (
            <>
              <Menu.Item key="signIn" style={{ float: "right" }}>
                <Link to="/login">SIGN IN</Link>
              </Menu.Item>
              <Menu.Item key="sighUp" style={{ float: "right" }}>
                <Link to="/register">SIGN UP</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </Layout>
  );
}

export default withRouter(NavBar);
