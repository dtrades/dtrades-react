import React, { Component } from "react";
import eos from "../eosjs";
import Form from "../pagedraw/component_1";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      street: "",
      city: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(e.target.name, e.target.value);
  }

  async onBuy() {
    const { productid } = this.props.match.params;
    console.log("buying product", productid);
    const options = {
      authorization: "dtradeseller@active",
      broadcast: true,
      sign: true
    };
    const response = await eos.transfer(
      "dtradeseller",
      "dtradebuyer1",
      "0.0001 EOS",
      "memo here",
      options
    );
    console.log(response);
  }

  componentDidMount() {
    this.onBuy();
  }

  render() {
    return (
      <div>
        <Form onChange={this.onChange} {...this.state} />
      </div>
    );
  }
}

export default ProductDetail;
