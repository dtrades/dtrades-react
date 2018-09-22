import React, { Component } from "react";
import { eos, contractName } from "../eosjs";
import { buyer, seller } from "../accounts";
import Form from "../pagedraw/component_1";

import { encrypt } from "eos-communication-lib";

import AddressForm from '../components/AddressForm'


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      name: "John Smith",
      company: "Block Two",
      address1: "42 Wallaby Way",
      address2: "",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      postcode: "4550",
      instructions: "Use it well."
    };
    this.onChange = this.onChange.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    console.log(name, value)
    this.setState({ [name]: value });
  }

  async fetchProduct(id) {
    console.log("fetching product", id);
    const { rows } = await eos.getTableRows(
      true,
      contractName,
      contractName,
      this.props.table
    );
    const product = rows.find(product => product.id === id);
    this.setState({ product });
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
    const { productid } = this.props.match.params;
    this.fetchProduct(productid)
    console.log("*****", productid)
    // this.onBuy();
  }

  render() {
    return (
      <div>
        <AddressForm onChange={this.onChange} buy={this.onBuy} {...this.state} />
      </div>
    );
  }
}

export default ProductDetail;
