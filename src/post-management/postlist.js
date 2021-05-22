import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Post } from './post';

const Postlist = ({ posts, ...props }) => {
  return posts && posts.length === 0 ? (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: '50vh', fontWeight: 600 }}
    >
      아직 등록된 글이 없어요. 😢
    </Grid>
    )
  : posts.map((item) => (
    <Post
      key={item.key}
      maxWidth="md"
      content={item}
      {...props}
    />
  ));
};

export default Postlist;
