import React from 'react';
import * as EosWebSocket from "../eosws/eosws";

export default class Tracker extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { data: {} };
  }

  componentDidMount() {
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
            this.setState({data});
            break;
          default:
            // console.log(message)
        }
      }
    }
  }

  render() {
    return (
      <div>
        Tracker: { JSON.stringify(this.state.data, null, 2) }
      </div>
    );
  }
}
