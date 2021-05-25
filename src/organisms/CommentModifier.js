import React from 'react';
import { Button } from '@material-ui/core';
import { PeopleAlt, Public } from '@material-ui/icons';

const CommentModifier = ({ postData, updatePostData }) => {
  const { commentModifier } = postData;

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={commentModifier === 'PUBLIC' ? <Public /> : <PeopleAlt />}
      onClick={() => {
        updatePostData({
          ...postData,
          commentModifier: commentModifier === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
        });
      }}
    >
      {
        commentModifier === 'PUBLIC' ? '댓글 공개' : '댓글 비공개'
      }
    </Button>
  );
};

export default CommentModifier;
