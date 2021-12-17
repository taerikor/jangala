import React from "react";
import { Button, Descriptions, Rate, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../_actions/user";

const { Title } = Typography;

function ProductInfo({ detail }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user.userData);

  const onClick = () => {
    dispatch(addToCart(detail._id));
  };
  return (
    <div>
      <Title>{detail.title}</Title>
      <Descriptions column={{ xl: 1, md: 1, sm: 1, xs: 1 }} bordered>
        <Descriptions.Item label="Price">{`$ ${detail.price}`}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="Rating">
          <Rate allowHalf disabled value={detail.rating} />
          <span>{` ${detail.rating} reviews: ${detail.reviews?.length} `}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {detail.description}
        </Descriptions.Item>
      </Descriptions>{" "}
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isAuth && (
          <Button size="large" shape="round" type="primary" onClick={onClick}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
