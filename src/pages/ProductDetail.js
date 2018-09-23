import React, { Component } from "react";
import { eos, contractName } from "../eosjs";
import { buyer, seller } from "../accounts";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Route } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import "./ProductDetail.css";

import { encrypt } from "eos-communication-lib";

import AddressForm from "../components/AddressForm";
import ImgMediaCard from "../components/ImgMediaCard";
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  card: {
    display: 'flex',
    padding: '20px',
    margin: '20px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: 320,
  },
  link: {
    textDecorationLine: 'none',
    color: 'inherit'
  }
});

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      processing: false,
      name: "John Smith",
      comp: "B2",
      add1: "42 Wallaby Way",
      add2: "",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      zip: "4550",
      vertical: 'top',
      horizontal: 'right',
      open: false
    };
    this.onChange = this.onChange.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
    this.onBuy = this.onBuy.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

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
    console.log(buyer);
    const { productid } = this.props.match.params;
    this.setState({ processing: true });
    console.log(productid, "you have");
    const message = JSON.stringify({ ...this.state });
    console.log(message.length);
    const cipherText = encrypt(buyer.priv, seller.pub, message, 900);
    console.log(JSON.stringify(cipherText));
    const options = {
      authorization: `${buyer.username}@active`,
      broadcast: true,
      sign: true
    };
    // To push transaction
    const result = await eos.transaction({
      actions: [
        {
          account: contractName,
          name: "purchase",
          authorization: [
            {
              actor: buyer.username,
              permission: "active"
            }
          ],
          data: {
            buyer: buyer.username,
            product_id: 0,
            quantity: 1,
            shipping: cipherText
          }
        }
      ]
    });
    this.setState({ processing: false, open: true });
    // this.props.history.push("/orders");
    console.log(result);
  }

  componentDidMount() {
    const { productid } = this.props.match.params;
    this.fetchProduct(productid);
    console.log("*****", productid);
    // this.onBuy();
  }



  render() {
    const { classes } = this.props;

    return !this.state.product ? (
            <LinearProgress />
    ) : (
      <div className="container">
        <div className="topper">
        <Card className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <CardMedia>
                <img className={classes.cover}
                  src={
                    "https://www.afrofood.com/wp-content/uploads/2012/08/hand-woven-african-basket.jpg"
                  }
                />
              </CardMedia>
            </Grid>
            <Grid item xs={6}>
              <div className="x">
                <List>
                  <ListItem>
                    <ListItemText primary="About" secondary="Genuine Handwoven Basket" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Seller Reputation" secondary="89" />
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
            </Grid>
          </Grid>
          </Card>
        </div>
        <Card className={classes.card}>

          <Grid container spacing={24}>
            <Grid item xs={12}>
              <AddressForm
                onChange={this.onChange}
                buy={this.onBuy}
                {...this.state}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={this.onBuy}
                className="center"
                variant="contained"
                size="large"
                color="primary"
              >
                {this.state.processing ? "Processing..." : "Buy"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductDetail);
