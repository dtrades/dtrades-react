import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SubmitTracking from '../components/SubmitTracking';
import ViewTracking from '../components/ViewTracking';
import ViewShipping from '../components/ViewShipping';
import MarkReceived from '../components/Received';
import * as accounts from "../accounts";
import "./Product.css";

import { Link } from 'react-router-dom'

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
    width: 151,
    height: 151,
  },
  link: {
    textDecorationLine: 'none',
    color: 'inherit'
  }
});

// <div>
//     <div><Link to={`/products/${id}`}>ID: {id}</Link></div>
//     <div>Seller: {seller}</div>
//     <div>Escrow: {escrow}</div>
//     <div>MetaData: {metadata}</div>
//     <div>Price: {price}</div>
// </div>

const images = [
  "https://www.afrofood.com/wp-content/uploads/2012/08/hand-woven-african-basket.jpg",
  "https://cdn.shopify.com/s/files/1/0993/9400/products/BABA_Pot_Basket_BABAPB27L_3_1024x1024.JPG",
  "https://www.afrofood.com/wp-content/uploads/2012/08/hand-woven-african-basket.jpg",
  "https://a.1stdibscdn.com/archivesE/upload/1121189/f_96338111516708259050/9633811_master.jpg"
];

function Product(props) {
  const { classes, theme, id, seller, buyer, escrow, metadata, price, total_price, shipping, tracking, status, ...other } = props;
  const { match : { params: {account} } } = other;
  console.log(account);
  return (
    <Card className={classes.card}>
           <Grid container spacing={24}>
            <Grid item xs={6} md={3}>
              <CardMedia
                className={classes.cover}
                image={images[0]}
              />
            </Grid>
             <Grid item xs={6}>
               <Typography variant="headline" color="textSecondary"><Link to={`${props.path}/${id}`} className={classes.link}>Genuine Handwoven Basket</Link></Typography>
               <Typography variant="subheading" color="textSecondary">
                 Sold by: {seller} (55)
               </Typography>
               <Typography variant="subheading" color="textSecondary">
                 Escrow by: {escrow} (255)
               </Typography>
               <Typography variant="subheading" color="textSecondary">
                 Price: {price || total_price} (each)
               </Typography>
               {status ? (
                 <Typography variant="subheading" color="textSecondary">
                   Status: {status}
                 </Typography>
               ) : ('')}
             </Grid>
             <Grid item xs={12} md={3}>
               {seller === account ? (<ViewShipping encrypt={accounts.shippingEncrypted} decrypt={accounts.shipping}/>) : ('')}
               {buyer === account ? (<ViewTracking encrypt={accounts.trackingEncrypted} decrypt={accounts.tracking}/>) : ('')}
               {seller === account ? (<SubmitTracking orderid={id}/>) : ('')}
               {buyer === account ? (<MarkReceived orderid={id}/>) : ('')}
             </Grid>
           </Grid>

    </Card>
  );
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Product);
