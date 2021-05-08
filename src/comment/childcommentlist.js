import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Comment } from './comment';
import { GetChildComment } from './commentapi';

const ChildCommentList = forwardRef((props, ref) => {
    const [childCommentList, setChildCommentList] = useState([]);
    const { projectId, postId, commentId, commentList } = props;

    useImperativeHandle(ref, () => ({
        SetChildCommentList: async () => {
            const response = await GetChildComment(commentId);
            if (response.size !== undefined) {
                await setChildCommentList(response);
            }
        },
    }));

    const RenewChildCommentList = useCallback(async () => {
        setChildCommentList(await GetChildComment(commentId));
      });

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
                  renewCommentList={RenewChildCommentList}
                  commentList={childCommentList}
                  type="child"
                />
              </>
            );
          })
        : []}
      </>
    );
});

export default ChildCommentList;
