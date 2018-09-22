import React, { Component } from "react";
import { eos, contractName } from "../eosjs";
import Product from '../components/Product';


class RamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rows: []
    };
    this.fetchTable = this.fetchTable.bind(this);
  }

  async fetchTable(tableName) {
    console.log("fetching table");
    const { rows } = await eos.getTableRows(
      true,
      contractName,
      contractName,
      this.props.table
    );
    this.setState({ rows })
  }

  async componentDidMount() {
    this.fetchTable();
  }

  render() {
      console.log(this.props.table, 'ggg')
    return (
      <div>
        {this.state.rows.map(product => <Product key={product.id} {...product}/>)}
      </div>
    );
  }
}

export default RamTable;
