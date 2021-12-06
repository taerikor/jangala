import { Typography } from "antd";
import React from "react";
const { Title } = Typography;
function History({ userData }) {
  return (
    <div style={{}}>
      <div style={{}}>
        <Title>MY ORDERS</Title>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Price</th>
            <th>Shipping Address</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {userData.history?.map((item) => {
            const date = new Date(item.dateOfPurchase);
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{`$ ${item.price}`}</td>
                <td>{item.user.address}</td>
                <td>{date.toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default History;
