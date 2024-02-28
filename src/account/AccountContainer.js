import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AccountContainer = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SignIn />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item>
          <Link to="/task">태스크 보러가기</Link>
        </Grid>
        <Grid item>
          <Link to="/myPage">마이페이지 보러가기</Link>
        </Grid>
      </Grid>

      <br />
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        회원 가입
      </Button>
      <br />
      <br />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box display="flex" alignItems="center">
          <Box flexGrow={1} />
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <SignUp />
      </Dialog>
    </div>
  );
};

export default AccountContainer;
