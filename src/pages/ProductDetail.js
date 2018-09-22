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
    const data = await eos.getTableRows(true, 'dtradesdapp1', 'dtradesdapp1', 'products')
    console.log(data)

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
