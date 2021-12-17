import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload({ uploadImages }) {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/saveImage", formData, config).then((res) => {
      if (res.data.success) {
        setImages([...images, res.data.filePath]);
        uploadImages([...images, res.data.filePath]);
      } else {
        alert("failed save image");
      }
    });
  };

  const onDeleteClick = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    uploadImages(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <span style={{ fontSize: "5rem" }}> + </span>
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div onClick={() => onDeleteClick(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt="product"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
