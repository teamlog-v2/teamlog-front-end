import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
const AccessModifier = ({ isLockOpen,  updateLockOpen}) => {
  return (
  <Grid container item justify='flex-end'>
  {!isLockOpen ? (
    <Grid item
      onClick={() => {
        updateLockOpen(!isLockOpen);
      }}
      style={{ cursor: 'pointer' }}
    >
      <Typography>
      내부 멤버만<Lock />
      </Typography>
    </Grid>
  ) : (
    <Grid item
      onClick={() => {
        updateLockOpen(!isLockOpen);
      }}
      style={{ cursor: 'pointer' }}
    >
      <Typography>
        외부에도 공개<LockOpen />
      </Typography>
    </Grid>
  )}
</Grid>);
};

export default AccessModifier;