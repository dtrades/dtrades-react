import React from 'react';
import * as EosWebSocket from "../eosws/eosws";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Tracker extends React.Component {
  state = {
    open: false,
    account: "",
    name: "",
    data: {}
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    const ws = new WebSocket("ws://35.203.114.193/v1/stream")
    ws.onopen = () => {
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "purchase"));
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "tracking"));
      ws.send(EosWebSocket.get_actions("dtradesdapp1", "received"));
      ws.send(EosWebSocket.get_actions("eosio.token", "transfer"));
    }
    ws.onmessage = (e) => {
      if (e) {
      const ws_message = JSON.parse(e.data);

      switch (ws_message.type) {
        case "ping":
          console.log('ping');
          break;
        case "listening":
          console.log('listening...');
          break;
        case "action_trace":
          console.log("eosws:", ws_message.data.trace.act)
          const {account, name, data} = ws_message.data.trace.act

          // Message that will be added to snackbar
          let message = "";
          switch (account) {
            case "dtradesdapp1":
              switch(name) {
                case "purchase":
                  message = `Purchase by ${data.buyer} for Product #${data.product_id}`;
                  break;
                case "tracking":
                  message = `Tracking for Order #${data.order_id}`
                  break;
                case "received":
                  message = `Received Order #${data.order_id}`;
                  break;
              }
              break;
            case "eosio.token":
              console.log(data);
              if (name === "transfer") {
                message = `Transfer ${data.from} to ${data.to} (${data.quantity})`;
              }
          }
          if (message) this.setState({open: true, account, name, data, message});
          break;
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Tracker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tracker);