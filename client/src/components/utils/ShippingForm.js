import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addAddressAction } from "../../_actions/user_action";

const ShippingForm = ({ onToggle }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "title") {
      setTitle(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "postal") {
      setPostal(value);
    } else if (name === "country") {
      setCountry(value);
    } else {
      return null;
    }
  };

  const onSubmit = () => {
    let body = {
      title,
      address,
      city,
      postal,
      country,
    };

    dispatch(addAddressAction(body));
    setAddress("");
    setCity("");
    setTitle("");
    setPostal("");
    setCountry("");
    onToggle();
  };

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={onSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Type Address Title",
          },
        ]}
      >
        <Input name="title" value={title} type="text" onChange={onChange} />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Type Address",
          },
        ]}
      >
        <Input name="address" value={address} type="text" onChange={onChange} />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Type City",
          },
        ]}
      >
        <Input name="city" value={city} type="text" onChange={onChange} />
      </Form.Item>
      <Form.Item
        label="Postal Code"
        name="postal"
        rules={[
          {
            required: true,
            message: "Type Postal Code",
          },
        ]}
      >
        <Input name="postal" value={postal} type="text" onChange={onChange} />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[
          {
            required: true,
            message: "Type Country",
          },
        ]}
      >
        <Input name="country" value={country} type="text" onChange={onChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShippingForm;
