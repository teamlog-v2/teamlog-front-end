import React from 'react';
import { Post } from './post';

const Postlist = ({ posts, setIsPostLoading, setFormData, initPosts, updateOpen }) => (
  posts.map((item) => (
    <Post
      key={item.key}
      maxWidth="md"
      postContents={item}
      setIsPostLoading={setIsPostLoading}
      setFormData={setFormData}
      initPosts={initPosts}
      updateOpen={updateOpen}
    />
  )));

export default Postlist;
