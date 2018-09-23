import React, { Component } from 'react';

import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import logo from './logo-blue.svg';
import logoWhite from './logo-white.svg';
import './App.css';
import ProductDetail from './pages/ProductDetail';
import RamTable from './pages/RamTable';
import Tracker from './components/Tracker';

import { Link, Route, Switch } from 'react-router-dom'


const styles = theme => ({
  appBar: {
    position: 'relative',
    padding: '10px',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  footerLogo: {
    marginBottom: '-6px',
  },
  appButtons: {
    color: 'white',
    textDecorationLine: 'none',
  }

});

const App = props => {
  const { classes, match } = props;
  const account = match ? match.params.account : 'dtradeseller';
  console.log(props);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.toolbarTitle}>
            <Link to={`/${account}/products`}><img src={logoWhite}/></Link>
          </div>
          <nav>
            <Link to={`/${account}/products`} className={classes.appButtons}><Button className={classes.appButtons}>Products</Button></Link>
            <Link to={`/${account}/orders`} className={classes.appButtons}><Button className={classes.appButtons}>Orders</Button></Link>
          </nav>
          <Button className={classes.appButtons}>{ account }</Button>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          {/*<Route path="/" component={Dashboard}/>*/}
          <Switch>
            <Route exact path={`${match.path}/products`} render={(props) => <RamTable table="products" {...props}/>} />
            <Route path={`${match.path}/products/:productid`} component={ProductDetail} />
            <Route path={`${match.path}/orders/:productid`} component={ProductDetail} />
            <Route exact path={`${match.path}/orders`} render={(props) => <RamTable table="orders" {...props}/>} />
            {/* <Route path="/orderbook/:account" component={RamTable} /> */}
            {/* <Route path="/history/:accountname" component={History} /> */}
            <Route path="/tracker" component={Tracker} />
          </Switch>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Thanks for using <img src={logo} className={classes.footerLogo}/>
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Made in a hurry by Team Computer Magic
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default withStyles(styles)(App);
