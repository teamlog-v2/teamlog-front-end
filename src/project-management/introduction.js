import { Box, Typography } from '@material-ui/core';
import React from 'react'

export const Introduction = (props) => {
    const {name, master_user_id, create_time, follower_count, member_count} = props;

    return(
        <Box>
            <Typography>👑 마스터는 {master_user_id}님입니다.</Typography>
            <Typography>🎉 {create_time}에 생성되었습니다.</Typography>
            <Typography>⭐ {follower_count}명이 팔로우하고 있습니다.</Typography> 
            <Typography>👨‍👧‍👧 {member_count}명의 멤버가 참여 중입니다.</Typography>
        </Box>
    );

    // 날짜는 가공해서 넣어야 합니다.
}