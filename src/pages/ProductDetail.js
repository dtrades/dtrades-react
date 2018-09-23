import React, { Component } from "react";
import { eos, buyer, seller, contractName } from "../eosjs";
import Form from "../pagedraw/component_1";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
      comp: "B2",
      add1: "42 Wallaby Way",
      add2: "",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      zip: "4550"
    };
    this.onChange = this.onChange.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
    this.onBuy = this.onBuy.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async fetchProduct(id) {
    const { rows } = await eos.getTableRows(
      true,
      contractName,
      contractName,
      "products"
    );
    const product = rows.filter(product => product.id == id)[0];
    this.setState({ product });
  }

  async onBuy(id) {
    const { productid } = this.props.match.params;
    console.log(productid, "you have");
    const message = JSON.stringify({ ...this.state });
    console.log(message.length);
    const cipherText = encrypt(buyer.priv, seller.pub, message, 900);
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

    return !this.state.product ? (
      <h1>Loading...</h1>
    ) : (
      <div className="container">
        <div className="topper">
          <div className="imageContainer">
            <img src={images[Math.floor(Math.random() * 4)]} />
          </div>

          <div className="x">

          </div>
          <div className="x">
            <List>
              <ListItem>
                <ListItemText
                  primary="Seller Reputation"
                  secondary="89"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Escrow"
                  secondary={this.state.product.escrow}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Seller"
                  secondary={this.state.product.seller}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Price"
                  secondary={this.state.product.price}
                />
              </ListItem>
            </List>
          </div>
        </div>
        <Divider />
        <AddressForm
          onChange={this.onChange}
          buy={this.onBuy}
          {...this.state}
        />
        <Button
          onClick={this.onBuy}
          variant="contained"
          size="large"
          color="primary"
        >
          Buy
        </Button>
      </div>
    );
  }
}

export default ProductDetail;
