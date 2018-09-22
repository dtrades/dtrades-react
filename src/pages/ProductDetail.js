import React, { Component } from "react";
import { eos, buyer, seller, contractName } from "../eosjs";
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

  async fetchTable(tableName) {
    console.log("fetching table");
    const { rows } = await eos.getTableRows(
      true,
      contractName,
      contractName,
      this.props.table
    );
    this.setState({ rows });
  }

  async componentDidMount() {
    this.fetchTable();
  }

  async onBuy(id) {
    console.log("received", id);
    const { productid } = this.props.match.params;
    console.log(productid, "you have");
    const message = JSON.stringify({ ...this.state });
    const cipherText = encrypt(buyer.priv, seller.pub, message);
    console.log(JSON.stringify(cipherText));
    const options = {
      authorization: `${buyer.accountName}@active`,
      broadcast: true,
      sign: true
    };
    const x = await eos.transfer(
      buyer.accountName,
      seller.accountName,
      "1.0000 EOS",
      "working",
      options
    );
    console.log(x);
    // To push transaction
    const result = await eos.transaction({
      actions: [
        {
          account: contractName,
          name: "purchase",
          authorization: [
            {
              actor: buyer.accountName,
              permission: "active"
            }
          ],
          data: {
            buyer: buyer.accountName,
            product_id: 0,
            quantity: 1,
            shipping: cipherText
          }
        }
      ]
    });
    console.log(result);
  }

  componentDidMount() {
    this.onBuy();
  }

  render() {
    return (
      <div>
        <Form onChange={this.onChange} buy={this.onBuy} {...this.state} />
      </div>
    );
  }
}

export default ProductDetail;
