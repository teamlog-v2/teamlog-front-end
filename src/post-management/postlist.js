import React, { useState, useEffect } from 'react';
import { Post } from './post';
// import data from './datalist';

const Postlist = ({ projectId }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8090/api/posts/list/${projectId}`)
      .then((res) => res.json()).then((info) => setPostList(info));
    console.log(postList);
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
