import React from 'react';
import { Post } from './post';

const Postlist = ({ posts }) => (posts.map((item) => <Post maxWidth="md" postContents={item} />));

export default Postlist;
