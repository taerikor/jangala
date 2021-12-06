import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingForm from "../../utils/ShippingForm";
import { Select, Descriptions, Result } from "antd";
import Paypal from "../../utils/Paypal";
import { onSuccessBuy } from "../../../_actions/user_action";
import UserCardBlock from "../CartPage/Sections/UserCardBlock";
import { useHistory } from "react-router";

const { Option } = Select;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [isAddAddress, setIsAddAddress] = useState(
    user.userData.shippingAddress === [] ? true : false
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [selected, setSelected] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    operationValue(user.cartDetail);
  }, []);

  useEffect(() => {
    if (!user.cartDetail) {
      history.push("/user/cart");
    }
  });

  const onToggleAddAddress = () => {
    setIsAddAddress((prev) => !prev);
    setSelected(null);
  };

  const handleChange = (value) => {
    const selectAddress = user.userData.shippingAddress.filter(
      (v) => v._id === value
    );
    setSelected(selectAddress[0].title);
    changeShippingForm(selectAddress[0]);
  };

  const changeShippingForm = (data) => {
    let address = `${data.address},${data.city} ${data.postal}, ${data.country}`;
    setShippingAddress(address);
  };
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

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: user.cartDetail,
        address: shippingAddress,
        price: totalPrice,
      })
    ).then((res) => {
      if (res.payload.success) {
        setIsSuccess(true);
      }
    });
  };
  return (
    <>
      {isSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <>
          <label>Shipping Address</label>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {user.userData.shippingAddress === [] ? (
              <p>No Address</p>
            ) : (
              <Select
                placeholder={"Select Address"}
                style={{ width: "120px" }}
                onChange={handleChange}
              >
                {user.userData.shippingAddress?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            )}
            <span
              onClick={onToggleAddAddress}
              style={{
                float: "right",
                color: "skyblue",
                cursor: "pointer",
              }}
            >
              Add
            </span>
          </div>
          {isAddAddress && <ShippingForm onToggle={onToggleAddAddress} />}
          {selected && (
            <div>
              <h2>{`Title: ${selected}`}</h2>
              <h3>{`Shipping Address: ${shippingAddress}`}</h3>
            </div>
          )}
          <div>
            <UserCardBlock products={user.cartDetail} removeFromCart={false} />
          </div>
          <div>
            <h2>{`SUBTOTAL (${totalQuantity}) ITEMS`}</h2>
            <h2>{`Total Amount : $${totalPrice}`}</h2>
            <Paypal amount={totalPrice} onSuccessBuy={transactionSuccess} />
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
