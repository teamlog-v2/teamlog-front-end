import React, { useState, useEffect } from 'react';
import { Post } from './post';
// import data from './datalist';

const Postlist = ({ projectId }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`http://3.15.16.150:8090/api/posts/project/${projectId}`)
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
