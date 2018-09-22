import React, { Component } from "react";
import eos from "../eosjs";

class ProductDetail extends Component {
  state = {
    name: "",
    street: "",
    city: ""
  };

  onChange() {

  }

  async onBuy() {
    const { productid } = this.props.match.params;
    console.log("buying product", productid);
    const options = {
      authorization: "dtradeseller@active",
      broadcast: true,
      sign: true
    };
    const response = await eos.transfer(
      "dtradeseller",
      "dtradebuyer1",
      "0.0001 EOS",
      "memo here",
      options
    );
    console.log(response)
  }

  componentDidMount() {
      this.onBuy();
  }

  render() {
      return <h1>Hello world,</h1>
  }
}


export default ProductDetail;