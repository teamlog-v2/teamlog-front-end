import React from 'react';
import { Button, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';

const PostCreator = ({ handleSubmit }) => (
  <Grid container item>
    <Grid container justify="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        작성하기
      </Button>
    </Grid>
  </Grid>
);

export default PostCreator;
