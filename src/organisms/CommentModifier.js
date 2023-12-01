import { PeopleAlt, Public } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

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
