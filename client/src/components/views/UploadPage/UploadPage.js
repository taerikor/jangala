import React, { useState } from "react";
import { Typography, Button, Form, Input, message } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
import { withRouter } from "react-router-dom";

const { TextArea } = Input;
const { Title } = Typography;

const CategoryOptions = [
  {
    value: 1,
    label: "Electronics",
  },
  {
    value: 2,
    label: "Fashion",
  },
  {
    value: 3,
    label: "Health",
  },
  {
    value: 4,
    label: "Sports",
  },
  {
    value: 5,
    label: "Pet supplies",
  },
  {
    value: 6,
    label: "Beauty",
  },
  {
    value: 7,
    label: "Baby",
  },
];

function UploadPage({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [images, setImages] = useState([]);

  const onTitleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onDescChange = (e) => {
    const {
      target: { value },
    } = e;
    setDescription(value);
  };

  const onPriceChange = (e) => {
    const {
      target: { value },
    } = e;
    setPrice(value);
  };
  const onCotinentChange = (e) => {
    const {
      target: { value },
    } = e;
    setCategory(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price || !images || !category) {
      return message.warning("type blank");
    }

    let ProductVariable = {
      title,
      description,
      price,
      images,
      writer: localStorage.getItem("userId"),
      category,
    };

    axios.post("/api/product", ProductVariable).then((res) => {
      if (res.data.success) {
        message.success("Upload Success");
        setTimeout(() => history.push("/"), 1000);
      } else {
        alert("failed to upload");
      }
    });
  };
  const uploadImages = (images) => {
    setImages(images);
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Product Upload </Title>
      </div>
      <FileUpload uploadImages={uploadImages} />
      <Form onSubmit={onSubmit}>
        <br />
        <br />
        <label>Title</label>
        <Input type="text" value={title} onChange={onTitleChange} />
        <br />
        <br />
        <label>Description</label>
        <TextArea value={description} onChange={onDescChange} />
        <br />
        <br />
        <label>Price</label>
        <Input type="number" value={price} onChange={onPriceChange} />
        <br />
        <br />
        <select onChange={onCotinentChange} value={category}>
          {CategoryOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadPage);
