import React from "react";
import { Card } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const { Meta } = Card;

function CardComponent({ cardInfo }) {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt={cardInfo.fields.description.stringValue}
          src={cardInfo.fields.image.stringValue}
        />
      }
      actions={[
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={cardInfo.fields.Link.stringValue}
        >
          <EllipsisOutlined />
        </a>,
      ]}
    >
      <Meta
        title={cardInfo.fields.description.stringValue}
        description={cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;
