import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Col, Row } from "antd";

import { useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import History from "../History/History";

const { Title } = Typography;

function ProfilePage({ history }) {
  const user = useSelector((state) => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState("");

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

  const onToggleEdit = () => {
    setIsEdit(!isEdit);
  };
  if (user.userData) {
    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Title>USER PROFILE</Title>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginTop: "3rem" }}>
              <label>UserName</label>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{user.userData.name}</h3>
                <span
                  onClick={onToggleEdit}
                  style={{
                    float: "right",
                    color: "skyblue",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </span>
              </div>
              {isEdit && (
                <Form onSubmit={onNameSubmit} style={{ display: "flex" }}>
                  <Input name="name" onChange={onNameChange} value={newName} />
                  <Button type="primary" size="large" onClick={onNameSubmit}>
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} md={16}>
          <History user={user} />
        </Col>
      </Row>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default withRouter(ProfilePage);
