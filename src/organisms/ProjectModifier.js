import { Lock, LockOpen } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

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
      isPostPublic ? '프로젝트 전체 공개' : '프로젝트 내부 공개'
    }
  </Button>
);

export default AccessModifier;
