import React from 'react';
import { Box } from '@material-ui/core';

export const modifyString = () => {
  // 가공해서 리턴해주면 그 값을 DateInfo에서 리턴하는 방향으로...
};

export const DateInfo = (props) => {
  const { year, month, date, fs } = props;

  return (
    <Box fontSize={fs}>{`${year}년 ${month}월 ${date}일`}</Box>
    // template string
    // Typography에는 글씨 크기에 대한 제한이 있는 듯 하여 Box 형태로 변경
  );
};
