import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Introduction = (props) => {
  const { masterUserId, createTime, followerCount, memberCount } = props;

  return (
    <Box>
      <Typography>👑 마스터는 {masterUserId}님입니다.</Typography>
      <Typography>🎉 {createTime}에 생성되었습니다.</Typography>
      <Typography>⭐ {followerCount}명이 팔로우하고 있습니다.</Typography>
      <Typography>👨‍👧‍👧 {memberCount}명의 멤버가 참여 중입니다.</Typography>
    </Box>
  );

  // 날짜는 가공해서 넣어야 합니다.
};

export default Introduction;
