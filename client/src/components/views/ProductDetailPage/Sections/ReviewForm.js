import axios from "axios";
import React, { useState } from "react";

import { Form, Input, Button, Rate } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const ReviewForm = ({ productId, refreshRender }) => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(2.5);
  const user = useSelector((state) => state.user);

  const onTextChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const onRateChange = (e) => {
    setRate(e);
  };

  const onSubmit = () => {
    let body = {
      text,
      rate,
      productId,
      userId: user.userData._id,
      name: user.userData.name,
    };
    axios.post("/api/product/add_review", body).then((res) => {
      if (res.data.success) {
        refreshRender(res.data.product);
        setText("");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <Form onFinish={onSubmit}>
      <h2>Reviews</h2>
      <Rate allowHalf defaultValue={2.5} onChange={onRateChange} value={rate} />
      <TextArea value={text} onChange={onTextChange} />
      <Button onClick={onSubmit} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;
