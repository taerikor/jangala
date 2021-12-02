import React, { useState } from "react";
import {
  Typography,
  Button,
  Form,
  message,
  Input,
  Col,
  Row,
  Select,
  Descriptions,
} from "antd";

import { useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import History from "../History/History";
import ShippingForm from "../../utils/ShippingForm";

const { Title } = Typography;
const { Option } = Select;

function ProfilePage({ history }) {
  const { userData } = useSelector((state) => state.user);

  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState(null);

  const onNameChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewName(value);
  };

  const onNameSubmit = (e) => {
    e.preventDefault();

    let nameEditVariable = {
      userId: localStorage.getItem("userId"),
      newName,
    };

    axios.post("/api/users/editUserName", nameEditVariable).then((res) => {
      if (res.data.success) {
        history.push("/");
        message.success("Edit Success");
      } else {
        alert("failed edit name");
      }
    });
  };

  const onToggleNameEdit = () => {
    setIsNameEdit((prev) => !prev);
  };
  const onToggleAddAddress = () => {
    setIsAddAddress((prev) => !prev);
    setSelected(null);
  };

  const handleChange = (value) => {
    const selectAddress = userData.shippingAddress.filter(
      (v) => v._id === value
    );
    setSelected(selectAddress[0]);
  };
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Title>USER PROFILE</Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: "3rem" }}>
            <label>Name</label>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{userData.name}</h3>
              <span
                onClick={onToggleNameEdit}
                style={{
                  float: "right",
                  color: "skyblue",
                  cursor: "pointer",
                }}
              >
                Edit
              </span>
            </div>
            {isNameEdit && (
              <Form onSubmit={onNameSubmit} style={{ display: "flex" }}>
                <Input name="name" onChange={onNameChange} value={newName} />
                <Button type="primary" size="large" onClick={onNameSubmit}>
                  Submit
                </Button>
              </Form>
            )}
            <label>Shipping Address</label>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {userData.shippingAddress === [] ? (
                <p>No Address</p>
              ) : (
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {userData.shippingAddress?.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              )}
              <span
                onClick={onToggleAddAddress}
                style={{
                  float: "right",
                  color: "skyblue",
                  cursor: "pointer",
                }}
              >
                Add
              </span>
            </div>
          </div>
          {isAddAddress && <ShippingForm onToggle={onToggleAddAddress} />}
          {selected && (
            <Descriptions title={selected.title}>
              <Descriptions.Item label="Address">
                {selected.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {selected.city}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {selected.postal}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {selected.country}
              </Descriptions.Item>
            </Descriptions>
          )}
        </div>
      </Col>
      <Col xs={24} md={16}>
        <History userData={userData} />
      </Col>
    </Row>
  );
}

export default withRouter(ProfilePage);
