import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Post } from './post';

const Postlist = ({ posts, ...props }) => (
  posts.map((item) => (
    <Post
      key={item.key}
      maxWidth="md"
      content={item}
      {...props}
    />
)));

export default Postlist;
