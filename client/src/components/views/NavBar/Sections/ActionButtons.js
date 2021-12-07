import React from "react";
import { WechatOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  margin: 15px;
`;
const Button = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00152a;
  border-radius: 50%;
  margin-top: 10px;
  cursor: pointer;
`;
const ActionButtons = ({ actions }) => {
  return (
    <Wrapper>
      <Button onClick={() => actions()}>
        <WechatOutlined style={{ fontSize: "30px", color: "white" }} />
      </Button>
      <Link to="/product/upload">
        <Button>
          <PlusOutlined style={{ fontSize: "30px", color: "white" }} />
        </Button>
      </Link>
    </Wrapper>
  );
};

export default ActionButtons;
