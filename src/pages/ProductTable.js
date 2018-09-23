import React, { Component } from "react";
import * as EosWebSocket from "../eosws/eosws";
import { eos, contractName } from "../eosjs";
import Product from '../components/Product';
import LinearProgress from '@material-ui/core/LinearProgress';


class RamTable extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        rows: []
    };
    this.fetchTable = this.fetchTable.bind(this);
  }

  async fetchTable(tableName) {
    console.log("fetching table");
    const table = {
        json: true,
        scope: contractName,
        code: contractName,
        table: this.props.table,
        limit: 1000
    }
    const { rows } = await eos.getTableRows(table);
    const filtered = rows.filter(r=>r.seller === 'dtradeseller').sort(r=>r.id);
    console.log(filtered);
    this.setState({rows: filtered})
  }

  async componentDidMount() {
    const ws = new WebSocket("ws://35.203.114.193/v1/stream")
    ws.onopen = () => {
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "purchase"));
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "tracking"));
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "received"));
    }
    ws.onmessage = (e) => {
      if (e) {
        const ws_message = JSON.parse(e.data);

        switch (ws_message.type) {
          case "ping":
            console.log('ProductTable.ping');
            break;
          case "listening":
            console.log('ProductTable.listening...');
            break;
          case "action_trace":
            console.log("ProductTable.eosws:", ws_message.data.trace.act);
            this.fetchTable();
        }
      }
    }
    this.fetchTable();
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  render() {
    if (this.state.rows.length === 0) {
        return (
            <LinearProgress />
        )
    }
    return (
      <div>
        {this.state.rows.map(product => <Product key={product.id} {...product} {...this.props} path={this.props.match.url}/>)}
      </div>
    );
  }
}

export default RamTable;
