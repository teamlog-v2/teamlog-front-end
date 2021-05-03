import React from 'react';
import { Box } from '@material-ui/core';

export const modifyString = () => {
  // 가공해서 리턴해주면 그 값을 DateInfo에서 리턴하는 방향으로...
};

export const ManufactureDate = (dateTime) => {
    const defaultVal = 1;
    if (dateTime !== undefined) {
    const dateString = dateTime.toString().split('-');
    const year = dateString[0];
    const month = dateString[1];
    const date = dateString[2].split('T')[0];
    return `${year}년 ${month}월 ${date}일`;
  }

  return `${defaultVal}년 ${defaultVal}월 ${defaultVal}일`;
};

export const DateInfo = (props) => {
  const { dateTime, fs } = props;
  const manufacturedDate = ManufactureDate(dateTime);

  return (
    <Box fontSize={fs}>{manufacturedDate}</Box>
    // template string
    // Typography에는 글씨 크기에 대한 제한이 있는 듯 하여 Box 형태로 변경
  );
};
