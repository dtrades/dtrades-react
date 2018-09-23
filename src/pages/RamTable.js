import React, { Component } from "react";
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
    this.fetchTable();
    this.interval = setInterval(() => this.fetchTable(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
