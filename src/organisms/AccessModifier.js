import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const AccessModifier = ({ isPostPrivate, updateIsPostPrivate }) => (
  <Grid container item justify="flex-end">
    {!isPostPrivate ? (
      <Grid
        item
        onClick={() => {
          updateIsPostPrivate(!isPostPrivate);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <Lock />
          </Grid>
          <Grid item>
            <Typography>
              내부 멤버만
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <Grid
        item
        onClick={() => {
          updateIsPostPrivate(!isPostPrivate);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <LockOpen />
          </Grid>
          <Grid item>
            <Typography>
              외부에도 공개
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )}
  </Grid>
);

export default AccessModifier;
