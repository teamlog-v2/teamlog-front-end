import React, { useState, useEffect } from 'react';
import { Post } from './post';
// import data from './datalist';

const Postlist = ({ projectId }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${projectId}`)
      .then((res) => res.json()).then((info) => setPostList(info));
  }, []);

  return (
    <>
      {postList
        ? postList.map((item) => <Post maxWidth="md" postContents={item} />)
        : null}
    </>
  );
};

export default Postlist;
