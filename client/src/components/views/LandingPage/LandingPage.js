import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography, Button, Card, Col, Row, Rate } from "antd";
import Carousel from "../../utils/CarouselSlider";
import CheckBox from "./Sections/CheckBox";
import { category, price } from "./Sections/Datas";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ category: [], price: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadDone, setIsLoadDone] = useState(false);

  useEffect(() => {
    let productsBody = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(productsBody);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/getProducts", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setPostSize(res.data.products.length);
        setIsLoadDone(true);
      } else {
        alert("failed to get products");
      }
    });
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col xl={6} lg={8} md={8} sm={12} xs={24} key={product._id}>
        <Link to={`/product/${product._id}`}>
          <Card
            cover={
              <img
                src={`http://localhost:5000/${product.images[0]}`}
                style={{ width: "100%", height: "300px" }}
                alt="product"
              />
            }
          >
            <Meta title={product.title} description={`$${product.price}`} />
            <Rate allowHalf disabled defaultValue={product.rating} />
          </Card>
        </Link>
      </Col>
    );
  });

  const onLoadClick = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };
  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };
  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1200px" }}>
        {isLoadDone ? (
          <>
            <Carousel />
            <Row gutter={[16, 16]}>
              <Col lg={12} xs={24}>
                {/* CheckBox */}
                <CheckBox
                  list={category}
                  handleFilters={(filters) =>
                    handleFilters(filters, "category")
                  }
                />
              </Col>
              <Col lg={12} xs={24}>
                {/* RadioBox */}
                <RadioBox
                  list={price}
                  handleFilters={(filters) => handleFilters(filters, "price")}
                />
              </Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem auto",
              }}
            >
              <SearchFeature reFreshFunction={updateSearchTerm} />
            </div>
            <br />
            <Row gutter={(12, 12)}>{renderCards}</Row>
            <br />
            {postSize >= Skip && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={onLoadClick}>Load More</Button>
              </div>
            )}
          </>
        ) : (
          <Title>Loading... </Title>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
