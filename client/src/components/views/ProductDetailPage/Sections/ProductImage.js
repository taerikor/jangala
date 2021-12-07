import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

import "./styles.css";

function ProductImage({ detail }) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      let images = [];

      detail.images.forEach((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
