import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pagedraw/component_1';
import Two from './pagedraw/component_2';
import ProductDetail from './pages/ProductDetail';
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
