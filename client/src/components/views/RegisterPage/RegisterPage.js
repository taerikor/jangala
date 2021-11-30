import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function RegisterPage({ history }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      return null;
    }
  };

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return alert("Please check confirm password");
    }

    let body = {
      email,
      password,
      name,
    };
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input name="name" value={name} type="text" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input name="email" value={email} type="email" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            name="password"
            value={password}
            type="password"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Confirm"
          name="confirm password"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
          ]}
        >
          <Input.Password
            name="confirmPassword"
            value={confirmPassword}
            type="password"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
