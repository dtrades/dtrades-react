import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { eos, contractName } from "../eosjs";
import { buyer, seller, trackingEncrypted } from "../accounts";

export default class FormDialog extends React.Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


    async onReceived(id) {
      const options = {
        authorization: `${buyer.username}@active`,
        broadcast: true,
        sign: true
      };
      // To push transaction
      const result = await eos.transaction({
        actions: [
          {
            account: contractName,
            name: "tracking",
            authorization: [
              {
                actor: seller.username,
                permission: "active"
              }
            ],
            data: {
              order_id: id,
              details: trackingEncrypted
            }
          }
        ]
      });
      this.setState({ processing: false, open: true });
      // this.props.history.push("/orders");
      console.log(result);
    }

  render() {
    return (
      <React.Fragment>
      <Button onClick={this.handleClickOpen} color="primary" variant="outlined" style={{margin:'10px'}}>Submit Tracking</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tracking Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide the tracking information to the buyer. It will be encrypted.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tracking Number"
              type="text"
              value="A1399877333"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.onReceived(this.props.orderid)}}  color="primary">
              <LockOutlinedIcon/>Encrypt
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
