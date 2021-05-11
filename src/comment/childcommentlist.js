import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Comment } from './comment';
import { GetChildComment } from './commentapi';

const ChildCommentList = (props) => {
    const { projectId, postId, commentId, commentList } = props;
    const [childCommentList, setChildCommentList] = useState([]);
    const size = 5; // 몇 개씩 보여줄지 여기서 정하기
    const [commentState, setCommentState] = useState({
      size: 0, // 댓글 크기
      remaining: 0, // 잔여 댓글
    });
    const [moreVisibility, setMoreVisibility] = useState('none');

    useEffect(async () => {
      const response = await GetChildComment(commentId, commentState.size);

      setChildCommentList(response);
        setCommentState(
          { ...commentState,
            remaining: response.totalElements - commentState.size,
          },
        );

      if (response.last && response.totalElements - commentState.size <= 0) {
        setMoreVisibility('none');
      } else {
        setMoreVisibility('block');
      }
    }, [commentList, commentState.size]); // 부모 댓글 변경 및 개수 변화에 대한 useEffect

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
        <Box display={moreVisibility}>
          <Button
            fullWidth
            size="small"
            variant="text"
            onClick={async () => {
                setCommentState(
                  {
                    ...commentState,
                    size: commentState.size + size,
                  },
                );
            }}
          >
            답글 더 보기({`${commentState.remaining}`})
          </Button>
        </Box>
      </>
    );
};

export default ChildCommentList;
