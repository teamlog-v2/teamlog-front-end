import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Dialog
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import PlaceSearchApi from './PlacesSearchApi';

const SimpleDialog = (props) => {
  const { onClose, open, updateLocation } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      {/* <DialogTitle id="simple-dialog-title">위치 선택 API</DialogTitle> */}
      <PlaceSearchApi updateLocation={updateLocation} onClose={onClose}/>
    </Dialog>
  );
};
  
const PlacesSearch = ({ updateLocation }) => {
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
        <Typography>
          <LocationOn />어디를 방문하셨나요?
        </Typography>
      </Grid>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        updateLocation={updateLocation}
        />
    </>);
};

export default PlacesSearch;