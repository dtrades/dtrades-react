import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const AddressForm = ({ onChange, name, comp, add1, add2, city, zip, country }) => {
  return (
    <React.Fragment>

      <Grid container spacing={24}>
        <Grid item xs={12}>
        <Typography variant="title" gutterBottom>
          Address
        </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            value={name}
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            value={comp}
            id="comp"
            name="comp"
            label="Company"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={onChange}
            value={add1}
            id="add1"
            name="add1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            value={city}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            value={zip}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            value={country}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
