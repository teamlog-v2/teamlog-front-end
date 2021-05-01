import React, { useState, useEffect } from 'react';
// import { Post } from './post';
// import data from './datalist';
import { Comment } from './comment';

const CommentList = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  // const [childCommentList, setChildCommentList] = useState([]);

  useEffect(() => {
    fetch(`http://3.15.16.150:8090/api/comments/${postId}`)
      .then((res) => res.json()).then((info) => setCommentList(info));
  }, []);

  return (
    <>
      {commentList
        ? commentList.map((item) => (
          <>
            <Comment
              id={item.id}
              contents={item.contents}
              writer={item.writer}
              commentMentions={item.commentMentions}
              postId={postId}
              writeTime={item.writeTime}
              type="parent"
            />
          </>
        )) : null}
    </>
  );
};

export default CommentList;
