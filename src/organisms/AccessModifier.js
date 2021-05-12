import React from 'react';
import { Button } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const AccessModifier = ({ isPostPublic, updateIsPostPublic }) => (
  <Button
    size="small"
    variant="outlined"
    startIcon={isPostPublic ? <LockOpen /> : <Lock />}
    onClick={() => {
      updateIsPostPublic(!isPostPublic);
    }}
    style={{ margin: '0.5%' }}
  >
    {
      isPostPublic ? '포스트 전체 공개' : '포스트 내부 공개'
    }
  </Button>
);

export default AccessModifier;
