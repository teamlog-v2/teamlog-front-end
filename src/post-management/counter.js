import { Box, makeStyles, Tooltip } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { React, useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import LikerList from '../pages/likerListPage';
import { CreateLiker, DeleteLiker, GetLiker } from './postlikeapi';
import './heart.css';

const useStyles = makeStyles(() => ({
  likerCursor: {
    cursor: 'pointer',
  },
  heart: {
    position: 'absolute',
    animation: 'bounce',
  },
}));

export const LikerCounter = (props) => {
  const classes = useStyles();
  const [userId] = useContext(AuthContext);
  const [like, setLike] = useState(false); // 본인 좋아요 여부
  const [likers, setLikers] = useState([]); // 좋아하는 유저 목록
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLikerListOpened, setIsLikerListOpened] = useState(false);
  const { postId, count, setLikerCounter } = props;

  useEffect(async () => {
    setIsLoaded(false);
    const response = await GetLiker(postId);
    setLikers(response);
    const contains = (val) => response.some(({ id }) => id.includes(val));
    if (contains(userId)) { // 아이디 변경 필요
      setLike(1);
    } else {
      setLike(0);
    }
    setIsLoaded(true);
  }, [postId]);

  const LikeIt = async () => {
    if (like === 2) return;

    let status;
    if (!like) {
      status = await CreateLiker(postId);
      setLikerCounter(1);
    } else {
      status = await DeleteLiker(postId);
      setLikerCounter(-1);
    }

    if (like === 1) setLike(0);
    else {
      setLike(2);
      setTimeout(() => {
        if (like === 1) setLike(0);
        else setLike(1);
      }, 2100);
    }
    const response = await GetLiker(postId);
    setLikers(response);
  };

  const Icon = () => {
    if (like === 2) {
      return <FavoriteIcon className="gelatine" fontSize="small" style={{ color: '#F5575A' }} />;
    }
    if (like === 1) {
      return <FavoriteIcon fontSize="small" style={{ color: '#F5575A' }} />;
    }
    return <FavoriteBorderIcon fontSize="small" />;
  };

  const TooltipTitle = () => {
    if (likers.length === 0) {
      return '가장 먼저 좋아요를 눌러보세요!';
    } if (likers.length === 1) {
      return `${likers[0].id}님이 좋아합니다.`;
    }
    return `${likers[0].id}님 외 ${likers.length - 1}명이 좋아합니다.`;
  };

  return isLoaded ? (
    <>
      <Box className={classes.likerCursor} display="inline-block" onClick={() => LikeIt()}>
        <Icon />
      </Box>
      <Tooltip title={TooltipTitle()}>
        <Box className={classes.likerCursor} display="inline-block" onClick={() => setIsLikerListOpened(true)}>
          {count}
        </Box>
      </Tooltip>
      <ResponsiveDialog open={isLikerListOpened} updateOpen={setIsLikerListOpened}>
        <LikerList likerList={likers} updateOpen={setIsLikerListOpened} />
      </ResponsiveDialog>
    </>
  ) : (
    <>
      <Box display="inline-block">
        <FavoriteBorderIcon fontSize="small" />
      </Box>
      <Box display="inline-block">0</Box>
    </>
  );
};

export const CommentCounter = (props) => {
  const { count } = props;
  return (
    <Box display="inline-block">
      <ChatBubbleOutlineIcon fontSize="small" />
      {count}
    </Box>
  );
};
