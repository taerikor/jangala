import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Wrapper = styled.a`
  background-color: #212121;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    max-width: 350px;
    max-height: 350px;
    border-radius: 50%;
  }
`;
const ContentWrapper = styled.div`
  color: white;
  text-align: left;
  width: 30%;
  margin-left: 50px;
`;

const Title = styled.h1`
  color: white;
`;
function CarouselSlider() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/product/top_products")
      .then((res) => setProducts(res.data))
      .catch((err) => alert(err));
  }, []);

  if (products) {
    console.log(products);
    return (
      <>
        <h1>Top Sales</h1>
        <Carousel showStatus={false} showThumbs={false}>
          {products.map((product, index) => (
            <Wrapper href={`/product/${product._id}`} key={index}>
              <img
                src={`http://localhost:5000/${product.images[0]}`}
                alt="main product"
              />
              <ContentWrapper>
                <Title>{product.title}</Title>
                <p>{`${product.description}`}</p>
                <p style={{ fontSize: "1rem" }}>{`${product.price} $`}</p>
              </ContentWrapper>
            </Wrapper>
          ))}
        </Carousel>
      </>
    );
  } else {
    return null;
  }
}

export default CarouselSlider;
