import React, { useState, useEffect, useCallback } from 'react';
// import { Post } from './post';
// import data from './datalist';
import { Comment } from './comment';
import CommentForm from './commentform'


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
        ? commentList.map((item) => {
          let childCommentList = item.childComments;
          console.log(childCommentList);
          return (<>
            <Comment
              id={item.id}
              contents={item.contents}
              writer={item.writer}
              commentMentions={item.commentMentions}
              postId={postId}
              writeTime={item.writeTime}
              type="parent"
            />
            {
              childCommentList ? childCommentList.map((childItem) => {
                return(
                  <Comment
                id={childItem.id}
                contents={childItem.contents}
                writer={childItem.writer}
                commentMentions={childItem.commentMentions}
                postId={postId}
                writeTime={childItem.writeTime}
                type="child"
              />
                );
                
              }) : []
            }
          </>);
          
}) : []}
        <CommentForm
            options={[
              '신동헌',
              '신현정',
              '이희수',
              '윤진',
              '오득환',
              '이현아',
              '김사람',
              '이사람',
              '강소공',
              'Zaki Mars Stewart',
              '박지훈',
              '박소공',
              '김소공',
              '김시관',
              '김성렬',
              '김선명',
              '김민종',
              '김효진',
              '김초코',
              '김커피',
              '김생수',
              '김에어',
              '김지현',
            ]}
            parentCommentId={null}
            postId={postId}
          />
    </>
  );
};

export default CommentList;
