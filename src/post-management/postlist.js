import React from 'react';
import { Post } from './post';

const Postlist = ({ posts }) => posts.map((item) => (
  <Post key={item.key} maxWidth="md" postContents={item} />
  ));
  // <Post postContents={posts[13]} />// 하나 테스트

export default Postlist;
