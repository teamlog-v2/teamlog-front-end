import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { ManufactureDate } from '../post-management/datetime';

const TeamIntroduction = (props) => {
    const { masterId, createTime, followerCount, memberCount } = props;

    const dateTime = ManufactureDate(createTime);

    return (
      <Box>
        <Typography>👑 마스터는 {masterId}님입니다.</Typography>
        <Typography>🎉 {dateTime}에 생성되었습니다.</Typography>
        <Typography>⭐ {followerCount}명이 팔로우하고 있습니다.</Typography>
        <Typography>👨‍👧‍👧 {memberCount}명의 멤버가 참여 중입니다.</Typography>
      </Box>
    );
};

export default TeamIntroduction;
