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
import { shipping, shippingEncrypted, tracking, trackingEncrypted } from "../accounts";

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
});

// <div>
//     <div><Link to={`/products/${id}`}>ID: {id}</Link></div>
//     <div>Seller: {seller}</div>
//     <div>Escrow: {escrow}</div>
//     <div>MetaData: {metadata}</div>
//     <div>Price: {price}</div>
// </div>

const images = [
  "https://cdn.shopify.com/s/files/1/2931/2708/products/8L5A2537_1000x.jpg",
  "https://cdn.shopify.com/s/files/1/0993/9400/products/BABA_Pot_Basket_BABAPB27L_3_1024x1024.JPG",
  "https://www.afrofood.com/wp-content/uploads/2012/08/hand-woven-african-basket.jpg",
  "https://a.1stdibscdn.com/archivesE/upload/1121189/f_96338111516708259050/9633811_master.jpg"
];

function Product(props) {
  const { classes, theme, id, seller, escrow, metadata, price, total_price } = props;
  console.log(props);
  return (
    <Card className={classes.card}>
           <Grid container spacing={24}>
            <Grid item xs={6} md={3}>
              <CardMedia
                className={classes.cover}
                image={images[Math.floor(Math.random() * 4)]}
              />
            </Grid>
             <Grid item xs={6}>
               <Typography variant="headline">Genuine Handwoven Basket</Typography>
               <Typography variant="subheading" color="textSecondary">
                 Sold by: {seller} (55)
               </Typography>
               <Typography variant="subheading" color="textSecondary">
                 Escrow by: {escrow} (255)
               </Typography>
               <Typography variant="subheading" color="textSecondary">
                 Price: {price || total_price} (each)
               </Typography>
             </Grid>
             <Grid item xs={6} md={3}>
               <ViewShipping encrypt={shippingEncrypted} decrypt={shipping}/>
               <ViewTracking encrypt={trackingEncrypted} decrypt={tracking}/>
               <SubmitTracking/>
               <Button>Mark Received</Button>
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
