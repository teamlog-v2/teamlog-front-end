import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Dialog,
} from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import PlaceSearchApi from './PlacesSearchApi';

const SimpleDialog = (props) => {
  const { onClose, open, updateAddress, updateLocation } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      {/* <DialogTitle id="simple-dialog-title">위치 선택 API</DialogTitle> */}
      <PlaceSearchApi
        updateAddress={updateAddress}
        updateLocation={updateLocation}
        onClose={onClose}
      />
    </Dialog>
  );
};

const PlacesSearch = ({ updateLocation, updateAddress }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(1);
  };

  const handleClose = () => {
    setOpen(0);
  };

  return (
    <>
      <Grid onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <LocationOn />
          </Grid>
          <Grid item>
            <Typography>
              어디를 방문하셨나요?
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        updateLocation={updateLocation}
        updateAddress={updateAddress}
      />
    </>
    );
};

export default PlacesSearch;