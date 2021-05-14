import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

const getPassedTime = (date) => {
  const today = new Date();

  date.setMonth(date.getUTCMonth() - 1);

  const diff = Math.ceil((today.getTime() - date.getTime()) / 1000); // 초 단위 날짜차이값

  const OneMinute = 60;
  const OneHour = OneMinute * 60;
  const OneDay = OneHour * 24;
  const OneMonth = OneDay * 30.4368498983; // 태양년 / 12
  const OneYear = OneDay * 365.24219878; // 태양년

  if (diff < OneMinute) {
    return '방금 전';
  }

  if (diff < OneHour) {
    return `${Math.floor(diff / OneMinute)}분 전`;
  }

  if (diff < OneDay) {
    return `${Math.floor(diff / OneHour)}시간 전`;
  }

  if (diff < OneMonth) {
    return `${Math.floor(diff / OneDay)}일 전`;
  }

  if (diff < OneYear) {
    return `${Math.floor(diff / OneMonth)}달 전`;
  }

  return `${Math.floor(diff / OneYear)}년 전`;
};

const StyledSpan = styled.span`
  cursor: pointer;
  font-size: 13px;
  &: hover {
    text-decoration: underline;
  }
`;

export const ManufactureDate = (dateTime) => {
  const defaultVal = 1;
  if (dateTime !== undefined) {
    const year = dateTime[0];
    const month = dateTime[1];
    const date = dateTime[2];
    return `${year}년 ${month}월 ${date}일`;
  }

  return `${defaultVal}년 ${defaultVal}월 ${defaultVal}일`;
};

export const DateInfo = (props) => {
  const { dateTime } = props;
  const date = new Date(...dateTime);

  return (
    <Tooltip title={date.toLocaleString()}>
      <StyledSpan>{getPassedTime(date)}</StyledSpan>
    </Tooltip>
  );
};
