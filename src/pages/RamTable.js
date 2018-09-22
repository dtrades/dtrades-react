import React, { Component } from "react";
import { eos, contractName } from "../eosjs";
import Form from "../pagedraw/component_1";
import AnItem from '../components/Product';

class ProductDetail extends Component {
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
        <h1>hi</h1>
        {this.state.rows.map(product => <AnItem {...product}/>)}
      </div>
    );
  }
}

export default ProductDetail;
