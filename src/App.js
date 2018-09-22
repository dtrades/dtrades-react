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

import logo from './logo.svg';
import './App.css';
import Dashboard from './pagedraw/component_1';
import Two from './pagedraw/component_2';
import ProductDetail from './pages/ProductDetail';
<<<<<<< HEAD
import * as EosWebSocket from "./eosws";
import { Link, Route } from 'react-router-dom'

const ws = new WebSocket("ws://35.203.114.193/v1/stream")

ws.onopen = () => {
  ws.send(EosWebSocket.get_actions("eosio.token", "transfer"));
}

ws.onmessage = (e) => {
  if (e) {
    const message = JSON.parse(e.data);

    switch (message.type) {
      case "ping":
        console.log('ping');
        break;
      case "listening":
        console.log('listening...');
        break;
      case "action_trace":
        const data = message.data.trace.act.data
        console.log(data)
        break;
      default:
        console.log(message)
    }
  }
}

const App = () => (
  <div>
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to={`/product/hello`}>Product</Link>
    </nav>
    <div>
      {/*<Route path="/" component={Dashboard}/>*/}
      <Route path="/product/:productid" component={ProductDetail} />
      <Route path="/history/:accountname" component={Two} />
    </div>
  </div>
)

export default App;
=======
import RamTable from './pages/RamTable';

import { Link, Route, Switch } from 'react-router-dom'




const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const App = props => {
  const {classes} = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <img src={logo}/>
        </Toolbar>
      </AppBar>
      <main>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to={`/products`}>Products</Link>
          <Link to={`/orders`}>Orders</Link>
          <Link to={`/history/dtradebuyer1`}>History</Link>
          <Link to={`/product/hello`}>Product</Link>
        </nav>
        <div>
          {/*<Route path="/" component={Dashboard}/>*/}
          <Switch>
            <Route exact path="/products" render={(props) => <RamTable table="products"/>} />
            <Route path="/products/:productid" component={ProductDetail} />
            <Route path="/orders" render={(props) => <RamTable table="orders"/>} />
            <Route path="/orderbook/:account" component={RamTable} />
            <Route path="/history/:accountname" component={Two} />
          </Switch>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Thanks for using DTrades
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
>>>>>>> 0a79107f0cd8c404532d5f3384854fa28fbc160f
