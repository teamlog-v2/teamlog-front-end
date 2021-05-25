import React from 'react';
import { Button } from '@material-ui/core';
import { PeopleAlt, Public } from '@material-ui/icons';

const AccessModifier = ({ postData, updatePostData }) => {
  const { accessModifier } = postData;

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={accessModifier === 'PUBLIC' ? <Public /> : <PeopleAlt />}
      onClick={() => {
        updatePostData({
          ...postData,
          accessModifier: accessModifier === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC' });
      }}
    >
      {
        accessModifier === 'PUBLIC' ? '포스트 공개' : '포스트 비공개'
      }
    </Button>
);
};

export default AccessModifier;
