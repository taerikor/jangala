import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Comment, Tooltip, Rate } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import ReviewForm from "./Sections/ReviewForm";
import moment from "moment";
import { useSelector } from "react-redux";

function ProductDetailPage({ match }) {
  const [product, setProduct] = useState([]);
  const user = useSelector((state) => state.user);
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

  const refreshRender = (data) => {
    setProduct(data);
  };

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
      <h2>Reviews</h2>
      {user.userData?.isAuth && (
        <ReviewForm refreshRender={refreshRender} productId={productId} />
      )}
      <div>
        {product.reviews?.map((review) => (
          <div key={review._id}>
            <Comment
              author={review.name}
              actions={[
                <Rate allowHalf disabled defaultValue={review.rating} />,
              ]}
              datetime={
                <Tooltip
                  title={moment()
                    .subtract(1, "days")
                    .format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment().subtract(1, "days").fromNow()}</span>
                </Tooltip>
              }
              content={<p>{review.comment}</p>}
            ></Comment>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(ProductDetailPage);
