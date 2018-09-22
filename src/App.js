import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './pagedraw/component_1';
import Two from './pagedraw/component_2';
import ProductDetail from './pages/ProductDetail';
import RamTable from './pages/RamTable';

import { Link, Route, Switch } from 'react-router-dom'

const App = () => (
  <div>
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
  </div>
)

export default App;
