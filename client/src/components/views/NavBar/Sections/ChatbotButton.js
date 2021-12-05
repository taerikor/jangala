import React from "react";
import { WechatOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00152a;
  border-radius: 50%;
  margin: 15px;
  cursor: pointer;
`;
const ChatbotButton = ({ actions }) => {
  return (
    <Button onClick={() => actions()}>
      <WechatOutlined style={{ fontSize: "30px", color: "white" }} />
    </Button>
  );
};

export default ChatbotButton;
