import React, { Component } from "react";
import { eos, buyer, seller } from "../eosjs";
import Form from "../pagedraw/component_1";

import { encrypt } from "eos-communication-lib";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      street: "",
      city: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(e.target.name, e.target.value);
  }

  async onBuy() {
    const { productid } = this.props.match.params;
    const message = JSON.stringify({ ...this.state });
    const cipherText = encrypt(buyer.priv, seller.pub, message);
    console.log(JSON.stringify(cipherText));
    const options = {
      authorization: `${buyer.accountName}@active`,
      broadcast: true,
      sign: true
    };
    const result = await eos.transfer(
      buyer.accountName,
      seller.accountName,
      "0.0010 EOS",
      cipherText,
      options
    );
    console.log(result)
  }

  componentDidMount() {
    this.onBuy();
  }

  render() {
    return (
      <div>
        <Form onChange={this.onChange} {...this.state} />
      </div>
    );
  }
}

export default ProductDetail;
