import {
  React,
  useEffect,
  useState,
  Fragment,
  useCallback,
  // useRef,
} from 'react';
import ChildCommentList from './childcommentlist';
import { Comment } from './comment';
import { GetComment } from './commentapi';
import CommentForm from './commentform';

const CommentList = ({ projectId, postId }) => {
  // const childRef = useRef(); // 대댓 리스트 갱신을 위한 ref
  const [commentList, setCommentList] = useState([]);

  const RenewCommentList = useCallback(async () => {
    setCommentList(await GetComment(postId));
    // childRef.current.SetChildCommentList();
  });

  useEffect(async () => {
    setCommentList(await GetComment(postId));
  }, []);

  return (
    <>
      {commentList.content
        ? commentList.content.map((item) => {
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
                  commentList={commentList}
                  type="parent"
                />
                <ChildCommentList
                  projectId={projectId}
                  postId={postId}
                  commentId={item.id}
                  // ref={childRef}
                  commentList={commentList}
                />
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
