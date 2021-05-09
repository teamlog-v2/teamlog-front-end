import { Box, Button } from '@material-ui/core';
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
  const [commentList, setCommentList] = useState([]);
  // const [moreVisibility, setMoreVisibility] = useState([]);
  // const [commentPage, setCommentPage] = useState(0);
  // const size = 5; // 사이즈는 개발자 마음

  const RenewCommentList = useCallback(async () => {
    setCommentList(await GetComment(postId));
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
                  commentList={commentList}
                />
              </>
            );
          })
        : []}
      <Box display="none">
        <Button
          fullWidth
          size="small"
          variant="text"
          onClick={async () => {
            // setCommentPage(commentPage + 1);
            // const response = await GetComment(postId, commentPage, size);
            // response.content = commentList.content.concat(response.content);
            // setCommentList(response);
            // if (response.last) {
            //   setMoreVisibility('none');
            // }
            // response 변경된다면 코드 및 위치 바뀔 것으로 예상됨...
          }}
        >
          댓글 더 보기...
        </Button>
      </Box>
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
