import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Container, MenuItem, MenuList, Box, Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { useMediaQuery } from 'react-responsive';
import PropTypes, { string } from 'prop-types';
import UserInfo from './user';
import { DateInfo } from './datetime';
import { UserTag } from './tag';
import { CommentForm } from './commentlist'

const useStyles = makeStyles(() => ({
  more: {
    marginLeft: '0.25em',
    color: 'rgb(180, 180, 180)',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    cursor: 'pointer',
  },
  comment: {
    backgroundColor: 'rgb(245, 245, 245)',
    textAlign: 'left',
  },
  reply: {
    // display='inline-block' right='0px' width='10%' textAlign='right'
    display: 'inline-block',
    right: '0px',
    width: '10%',
    textAlign: 'right',
  },
  icon: {
    cursor: 'pointer',
    width: 'auto',
    display: 'inline-block',
    margin: '0.5em',
  },
  friends: {
    width: '20em',
    height: '25em',
    zIndex: '500',
    overflow: 'auto',
  },
}));

const Content = (props) => {
  const { contents, tagList } = props;

  const stringSplit = contents.split(' ');

  return (
    <Box marginTop="0.5em" marginBottom="0.5em" display="inline-block">
      {stringSplit ? stringSplit.map((item) => {
        if(item.charAt(0) === '@' && tagList.includes(item.split('@')[1])){
          return <UserTag userId = {item.split('@')[1]} />
        }
        return <Box display="inline-block"> {item} </Box>
      }) : []
      }
    </Box>
  );
};

const Header = (props) => {
  const { userId, imgPath } = props;
  return (
    <Box>
      <UserInfo userId={userId} imgPath={imgPath} />
    </Box>
  );
};

export const MoreComment = () => {
  const classes = useStyles();

  return(
    <Box className = {classes.more}>
      댓글 더 보기 . . .
    </Box>
  );
}

export const CommentCounter = (props) => {
  const { count } = props;
  return (
    <Box display="inline-block">
      <ChatBubbleOutlineIcon />
      {count}
    </Box>
  );
};

const CheckRoot = (type) => {
  if (type === 'child') {
    return {
      marginLeft: '1.5em', 
      buttonDisplay: 'hidden'
    }; 
  }

  return {
    marginLeft: '0.5em', 
    buttonDisplay: 'block'
  }; 
};

export const Comment = (props) => {
  const { id, projectId, type, postId, writeTime, writer, commentMentions, contents, SetCommentList} = props;
  const classes = useStyles();
  
  const [tagList, setTagList] = useState([]);
  const [formVisibility, setFormVisibility] = useState('none');
  
  useEffect(() => {
    setTagList(commentMentions);
  }, []);

  const commentStyle = CheckRoot(type);

  return (
    <Box className={classes.comment}>
      <Box marginLeft={commentStyle.marginLeft}>
        <Box display="inline-block" width="90%">
          <Header userId={writer.id} imgPath={writer.profileImgPath} />
          <Box>
           <DateInfo dateTime = {writeTime} fs="11px" />
          </Box>
        </Box>

        <Box className={classes.reply} visibility={commentStyle.buttonDisplay}>
          <Box
            className={classes.icon}
            onClick={() => {
              if (formVisibility === 'none'){
                setFormVisibility('block');
              } else{
                setFormVisibility('none')
              } 
            }}
          >
            <ReplyIcon color="action" />
          </Box>
        </Box>
        <Box>
          <Box display="inline-block" width="90%">
            <Content contents={contents} tagList={tagList} />
          </Box>
        </Box>
      </Box>

      {/* <Box display={formVisibility}>
        <CommentForm
            parentCommentId={id}
            projectId={projectId}
            postId={postId}
            setCommentList = {SetCommentList}
        />
      </Box> */}
    </Box>
  );
};

const FriendList = (props) => {
  const classes = useStyles();
  const { options, onClick, autoFocus } = props;

  return (
    <Container disableGutters>
      <Box className={classes.friends}>
        <MenuList autoFocusItem={autoFocus} variant="selectedMenu">
          {options
            ? options.map((item) => (
              <MenuItem 
                button
                className="option-active"
                key={item}
                onClick={onClick}>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </MenuItem>
                )): null
          }
        </MenuList>
      </Box>
    </Container>
  );
};