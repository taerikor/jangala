import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const Wrapper = styled(Link)`
  background-color: #212121;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    max-width: 350px;
    max-height: 350px;
    border-radius: 100%;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    & .description {
      display: none;
    }
    & img {
      max-width: auto;
      max-height: 300px;
      border-radius: 0;
    }
  }
`;
const ContentWrapper = styled.div`
  color: white;
  text-align: left;
  margin-left: 40px;
  @media (max-width: 767px) {
    margin-left: 0;
  }
`;

const Desc = styled.p`
  @media (max-width: 767px) {
    display: none;
  }
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
    return (
      <>
        <h1>Top Sales</h1>
        <Carousel showStatus={false} showThumbs={false}>
          {products.map((product, index) => (
            <Wrapper to={`/product/${product._id}`} key={index}>
              <img
                src={`http://localhost:5000/${product.images[0]}`}
                alt="main product"
              />
              <ContentWrapper>
                <Title
                  style={{ color: "white" }}
                >{`${product.title} ($ ${product.price})`}</Title>
                <Desc>{`${product.description}`}</Desc>
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
