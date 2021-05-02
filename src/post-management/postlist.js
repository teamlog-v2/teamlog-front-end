import React from 'react';
import { Post } from './post';

// const Postlist = ({ posts }) =>
// (posts.map((item) => <Post maxWidth="md" postContents={item} />));

const Postlist = ({ posts }) => (
  posts.map((item) => <Post key={item.key} maxWidth="md" postContents={item} />)
);

export default Postlist;
