import React, { useEffect, useState } from 'react';
import { Post } from './post';

// const Postlist = ({ posts }) =>
// (posts.map((item) => <Post maxWidth="md" postContents={item} />));

const Postlist = (/* { projectId } */) => {
    const [postList, setPostList] = useState([]);
    const projectId = 9; // 사실 매개변수로 받아와야 하는데 테스트상 임시로 넣은 상태

    useEffect(() => {
      fetch(`http://localhost:8090/api/posts/list/${projectId}`)
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
