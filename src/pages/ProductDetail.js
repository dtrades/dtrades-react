import React, { Component } from "react";
import { eos, buyer, seller, contractName } from "../eosjs";
import Form from "../pagedraw/component_1";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

import "./ProductDetail.css";

import { encrypt } from "eos-communication-lib";

import AddressForm from "../components/AddressForm";
import ImgMediaCard from "../components/ImgMediaCard";

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
      zip: "4550",
      instructions: "Use it well."
    };
    this.onChange = this.onChange.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
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
    this.fetchProduct(productid);
    console.log("*****", productid);
    // this.onBuy();
  }

  render() {
    const images = [
      "https://cdn.shopify.com/s/files/1/2931/2708/products/8L5A2537_1000x.jpg",
      "https://cdn.shopify.com/s/files/1/0993/9400/products/BABA_Pot_Basket_BABAPB27L_3_1024x1024.JPG",
      "https://www.afrofood.com/wp-content/uploads/2012/08/hand-woven-african-basket.jpg",
      "https://a.1stdibscdn.com/archivesE/upload/1121189/f_96338111516708259050/9633811_master.jpg"
    ];

    return (
      <div className="container">
        <div className="topper">
            <div className="imageContainer">
              <img src={images[Math.floor(Math.random() * 4)]} />
            </div>
                
          <div className="x">
          <Typography variant="title" gutterBottom>
            Seller: 89
          </Typography>
          </div>
          <div className="x">
          <Typography variant="title" gutterBottom>
            Escrow: OK
          </Typography>
          </div>
        </div>
        <Divider />
        <AddressForm
          onChange={this.onChange}
          buy={this.onBuy}
          {...this.state}
        />
        <Button variant="contained" size="large" color="primary">
          Buy
        </Button>
      </div>
    );
  }
}

export default ProductDetail;
