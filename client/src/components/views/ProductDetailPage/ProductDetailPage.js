import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import ReviewForm from "./Sections/ReviewForm";

function ProductDetailPage({ match }) {
  const [product, setProduct] = useState([]);

  const {
    params: { productId },
  } = match;

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* ProductImage */}
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* ProductInfo */}
          <ProductInfo detail={product} />
        </Col>
      </Row>
      <ReviewForm />
    </div>
  );
}

export default withRouter(ProductDetailPage);
