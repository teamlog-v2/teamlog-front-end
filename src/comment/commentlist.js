import {
  React,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from 'react';
import { Comment } from './comment';
import { GetComment } from './commentapi';
import CommentForm from './commentform';

const CommentList = ({ projectId, postId }) => {
  const [commentList, setCommentList] = useState([]);

  const RenewCommentList = useCallback(async () => {
    setCommentList(await GetComment(postId));
  });

  useEffect(async () => {
    setCommentList(await GetComment(postId));
  }, []);

  return (
    <>
      {commentList
        ? commentList.map((item) => {
            const childCommentList = item.childComments;
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
                  renewCommentList={RenewCommentList}
                  type="parent"
                />
                {childCommentList
                  ? childCommentList.map((childItem) => {
                      return (
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
                    })
                  : []}
              </>
            );
          })
        : []}
      <CommentForm
        parentCommentId={null}
        projectId={projectId}
        postId={postId}
        renewCommentList={RenewCommentList}
      />
    </>
  );
};

export default CommentList;
