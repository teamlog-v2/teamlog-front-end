import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Post } from './post';

const Postlist = ({ posts, Component, ...props }) => (
  posts.map((item) => (
    Component ? <Component key={item.key} post={item} type="home" />
    : (
      <Post
        key={item.key}
        maxWidth="md"
        content={item}
        {...props}
      />
    )
)));

export default Postlist;
