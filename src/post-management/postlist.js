import React from 'react';
import { Post } from './post';

const Postlist = ({ posts, ...props }) => (
  posts.map((item) => (
    <Post
      key={item.key}
      maxWidth="md"
      postContents={item}
      {...props}
    />
  )));

export default Postlist;
