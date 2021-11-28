import React, { Component } from "react";

import { PayPalButton } from "react-paypal-button-v2";

export default class Example extends Component {
  render() {
    return (
      <PayPalButton
        amount={this.props.amount}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          this.props.onSuccessBuy(data);
        }}
        options={{
          clientId:
            "AYSGwHkjmNBvSiTtZFYXzHXakVrhUgAyfK6dSDHKFMkDVwSxZnkfLmOGBRTOt1Ij6E9Ty6vKXswN6t8c",
        }}
      />
    );
  }
}
