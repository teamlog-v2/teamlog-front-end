import { Button, Grid } from '@mui/material';
import React from 'react';

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
