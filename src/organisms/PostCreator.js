import React from 'react';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';

const Post = ({ isFormUploaded, handleSubmit }) => (
  <Grid container item>
    <Grid container justify="flex-end">
      <IconButton
        disable={isFormUploaded}
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        <Create style={{ fontSize: 'larger', color: '#C16AF5' }} />
      </IconButton>
    </Grid>
  </Grid>
);

export default Post;
