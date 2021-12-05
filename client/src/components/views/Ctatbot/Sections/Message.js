import React from "react";
import { List, Avatar } from "antd";
import { RobotOutlined, SmileOutlined } from "@ant-design/icons";

function Message({ who, text }) {
  const AvatarIcon = who === "bot" ? <RobotOutlined /> : <SmileOutlined />;

  return (
    <List.Item style={{ padding: "1rem" }}>
      <List.Item.Meta
        avatar={<Avatar icon={AvatarIcon} />}
        title={who}
        description={text}
      />
    </List.Item>
  );
}

export default Message;
