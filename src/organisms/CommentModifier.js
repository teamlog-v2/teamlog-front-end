import React from 'react';
import { Button } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const CommentModifier = ({ postData, updatePostData }) => {
  const { commentModifier } = postData;

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={commentModifier === 'PUBLIC' ? <LockOpen /> : <Lock />}
      onClick={() => {
        updatePostData({
          ...postData,
          commentModifier: commentModifier === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
        });
      }}
      style={{ margin: '0.5%' }}
    >
      {
        commentModifier === 'PUBLIC' ? '댓글 전체 공개' : '댓글 내부 공개'
      }
      &nbsp;
      &nbsp;
    </Button>
  );
};

export default CommentModifier;
