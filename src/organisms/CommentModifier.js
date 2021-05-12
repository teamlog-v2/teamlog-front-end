import React from 'react';
import { Button } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const CommentModifier = ({ isCommentPublic, updateIsCommentPublic }) => (
  <Button
    size="small"
    variant="outlined"
    startIcon={isCommentPublic ? <LockOpen /> : <Lock />}
    onClick={() => {
      updateIsCommentPublic(!isCommentPublic);
    }}
    style={{ margin: '0.5%' }}
  >
    {
      isCommentPublic ? '댓글 전체 공개' : '댓글 내부 공개'
    }
    &nbsp;
    &nbsp;
  </Button>
);

export default CommentModifier;
