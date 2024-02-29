import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/auth';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import LikerList from '../pages/likerListPage';
import './css/heart.css';
import { CreateLiker, DeleteLiker, GetLiker } from './postLikeApi';

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
  const [accountId] = useContext(AuthContext);
  const [like, setLike] = useState(false); // 본인 좋아요 여부
  const [processing, setProcessing] = useState(false); // 좋아요 처리 중 여부
  const [likers, setLikers] = useState([]); // 좋아하는 유저 목록
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLikerListOpened, setIsLikerListOpened] = useState(false);
  const { postId, setLikerCounter } = props;

  useEffect(async () => {
    setIsLoaded(false);
    const response = await GetLiker(postId);
    setLikers(response);
    const contains = (val) => response.some(({ id }) => id.includes(val));
    if (contains(accountId)) {
      setLike(1);
    } else {
      setLike(0);
    }
    setIsLoaded(true);
  }, [postId]);

  const LikeIt = async () => {
    if (processing) return;

    if (!like) {
      await CreateLiker(postId);
      setLikerCounter(1);
    } else {
      await DeleteLiker(postId);
      setLikerCounter(-1);
    }

    if (like) setLike(false);
    else {
      setProcessing(true);
      setTimeout(() => {
        if (like) setLike(false);
        else setLike(true);
        setProcessing(false);
      }, 2100);
    }
    const response = await GetLiker(postId);
    setLikers(response);
  };

  const Icon = ({ className, onClick }) => {
    if (processing) {
      return (
        <FavoriteIcon
          className="gelatine"
          style={{ color: '#F5575A' }}
        />
      );
    }

    if (like) {
      return <FavoriteIcon style={{ color: '#F5575A' }} className={className} onClick={onClick} />;
    }
    return <FavoriteBorderIcon className={className} onClick={onClick} />;
  };

  const TooltipTitle = () => {
    if (likers.length === 0) {
      return '가장 먼저 좋아요를 눌러보세요!';
    }
    if (likers.length === 1) {
      return `${likers[0].id}님이 좋아합니다.`;
    }
    return `${likers[0].id}님 외 ${likers.length - 1}명이 좋아합니다.`;
  };

  return isLoaded ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon className={accountId ? classes.likerCursor : null}
        onClick={accountId ? () => LikeIt() : null} />
      <Typography variant="body2" color="text.secondary" style={{ marginLeft: '0.25em' }}>
        {TooltipTitle()}
      </Typography>
      <ResponsiveDialog
        open={isLikerListOpened}
        updateOpen={setIsLikerListOpened}
      >
        <LikerList likerList={likers} updateOpen={setIsLikerListOpened} />
      </ResponsiveDialog>
    </div>
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ChatBubbleOutlineIcon />
      <Typography variant="body2" color="text.secondary" style={{ marginLeft: '0.25em' }}>{count}</Typography>
    </div>
  );
};
