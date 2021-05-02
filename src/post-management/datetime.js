import React from 'react';
import { Box } from '@material-ui/core';

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
  );
};
