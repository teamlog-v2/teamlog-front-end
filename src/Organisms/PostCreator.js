import React from 'react';
import {
  Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';

const Post = ({ submitPost }) => (<Grid container item>
          <Grid container justify="flex-end">
            <IconButton onClick={() => {
                submitPost();
              }} style={{ backgroundColor: 'black' }}>
              <Create style={{ color: 'white' }}/>
            </IconButton>
          </Grid>
        </Grid>);

export default Post;