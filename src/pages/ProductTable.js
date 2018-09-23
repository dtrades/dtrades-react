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
      ws.send(EosWebSocket.get_table_deltas("dtradesdapp1", "dtradesdapp1", "orders"));
    }
    ws.onmessage = (e) => {
      if (e) {
        const ws_message = JSON.parse(e.data);
        console.log("update - fetchTable", ws_message);
        this.fetchTable()
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
