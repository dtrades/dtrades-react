import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DoneIcon from '@material-ui/icons/Done';

export default class FormDialog extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { open: false, show: false };
  }

  handleClickOpen = () => {
    this.setState({ open: true, show: this.state.show });
  };

  handleClose = () => {
    this.setState({ open: false, show: this.state.show });
  };

  handleDecrypt = () => {
    this.setState({ open: this.state.open, show: true });
  };

  render() {
    return (
      <React.Fragment>
      <Button onClick={this.handleClickOpen} color="primary" variant="outlined" style={{margin:'10px'}}>View Tracking</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tracking Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.show ? (<LockOpenOutlinedIcon/>) : (<LockOutlinedIcon/>)}
              {this.state.show ? JSON.stringify(this.props.decrypt, null, 2) : this.props.encrypt }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleDecrypt} color="primary">
              {this.state.show ? (<DoneIcon/>) : (<LockOpenOutlinedIcon/>)}
              {this.state.show ? 'Decrypted' : 'Decrypt' }
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
