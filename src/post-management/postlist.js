import React, { useState, useEffect } from 'react';
import { Post } from './post';
// import data from './datalist';

const Postlist = (props) => {
  const { dataList } = props;
  const [postList, setDataList] = useState([]);

  useEffect(() => {
    // 게시물, 해시태그, 사용자 해시태그, 댓글 모두 합친 json으로 예상
    // list 안에 list?
    setDataList(dataList);
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
