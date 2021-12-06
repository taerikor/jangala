import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeToCart } from "../../../_actions/user_action";
import UserCardBlock from "./Sections/UserCardBlock";
import { Typography, Empty, Button } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

function CartPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItems = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        setIsEmpty(false);
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, user.userData.cart)).then((res) => {
          operationValue(res.payload);
        });
      }
    }
  }, [user.userData]);

  const operationValue = (cartInfo) => {
    if (cartInfo) {
      let total = 0;
      let quantity = 0;
      cartInfo.forEach((item) => {
        let value = item.quantity * item.price;
        total += value;
        quantity += item.quantity;
      });
      setTotalPrice(total);
      setTotalQuantity(quantity);
    }
  };

  const removeFromCart = (productId) => {
    dispatch(removeToCart(productId)).then((res) => {
      if (res.payload.productInfo.length <= 0) {
        setIsEmpty(true);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>My Cart</Title>
      {isEmpty ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <div>
            <UserCardBlock
              products={user.cartDetail}
              removeFromCart={removeFromCart}
            />
          </div>
          <br />
          <div>
            <h2>{`SUBTOTAL (${totalQuantity}) ITEMS`}</h2>
            <h2>{`Total Amount : $${totalPrice}`}</h2>
          </div>
          <Link to="/user/checkout">
            <Button type="primary">Proceed to checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
