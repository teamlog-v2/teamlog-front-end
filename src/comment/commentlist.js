import { Box, Button } from '@material-ui/core';
import {
  React,
  useEffect,
  useState,
  Fragment,
  // useRef,
} from 'react';
import ChildCommentList from './childcommentlist';
import { Comment } from './comment';
import { GetComment } from './commentapi';
import CommentForm from './commentform';

const CommentList = ({ projectId, postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [moreVisibility, setMoreVisibility] = useState([]);
  const [commentSize, setCommentSize] = useState(5); // 5의 배수
  const [isLoaded, setIsLoaded] = useState(true);

  const RenewCommentList = async () => {
      const response = await GetComment(postId, commentSize);
      setCommentList(response);

      if (response.last) {
        setMoreVisibility('none');
      } else {
        setMoreVisibility('block');
      }
  };

  useEffect(async () => {
    const response = await GetComment(postId, commentSize);
    setIsLoaded(true);
    setCommentList(response);
      if (response.last) {
        setMoreVisibility('none');
      }
  }, [commentSize]);

  return isLoaded ?
   (
     <>
       {
      commentList.content
        ? commentList.content.map((item) => {
            return (
              <Box key={item.id}>
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
              </Box>
            );
          })
        : []
        }
       <Box display={moreVisibility}>
         <Button
           fullWidth
           size="small"
           variant="text"
           onClick={async () => {
            setCommentSize(commentSize + 5);
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
  ) : (<div>댓글 등록하는 중...</div>);
};

export default CommentList;
