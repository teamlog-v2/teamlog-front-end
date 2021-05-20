import React from 'react';
import { Button } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const AccessModifier = ({ postData, updatePostData }) => {
  const { accessModifier } = postData;
  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={accessModifier === 'PUBLIC' ? <LockOpen /> : <Lock />}
      onClick={() => {
        updatePostData({
          ...postData,
          accessModifier: accessModifier === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC' });
      }}
      style={{ margin: '0.5%' }}
    >
      {
        accessModifier === 'PUBLIC' ? '포스트 전체 공개' : '포스트 내부 공개'
      }
    </Button>
);
};

export default AccessModifier;
