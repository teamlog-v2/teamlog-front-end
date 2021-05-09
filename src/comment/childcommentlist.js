import React, { useEffect, useState } from 'react';
import { Comment } from './comment';
import { GetChildComment } from './commentapi';

const ChildCommentList = (props) => {
    const [childCommentList, setChildCommentList] = useState([]);
    const { projectId, postId, commentId, commentList } = props;

    useEffect(async () => {
        setChildCommentList(await GetChildComment(commentId));
      }, [commentList]);

    return (
      <>
        {childCommentList.content
        ? childCommentList.content.map((item) => {
            return (
              <>
                <Comment
                  id={item.id}
                  projectId={projectId}
                  contents={item.contents}
                  writer={item.writer}
                  commentMentions={item.commentMentions}
                  postId={postId}
                  writeTime={item.writeTime}
                  commentList={childCommentList}
                  type="child"
                />
              </>
            );
          })
        : []}
      </>
    );
};

export default ChildCommentList;
