import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './pagedraw/component_1';
import Two from './pagedraw/component_2';
import ProductDetail from './pages/ProductDetail';

import { Link, Route } from 'react-router-dom'

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
