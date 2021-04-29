import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-material-ui-carousel';
// import './carousel-theme.css';
// import './carousel.css';
import RoomIcon from '@material-ui/icons/Room';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import React, { useState, useEffect, useRef } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AmpStories, Menu } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import UserInfo from './user';
import LikerCounter from './liker';
import File from './file';
import { Media } from './media';
import { Tag } from './tag';
import { DateInfo } from './datetime';
import { Comment, CommentCounter, CommentForm, MoreComment } from './comment';

// import dao from '../../src/media/dao.png';
// import ogu from '../../public/media/ogu.PNG';;

// import cat from '../../src/media/cat.mp4';
// import piano from '../../src/media/piano.mp4';

import cat1 from '../media/cat1.PNG';
import cat2 from '../media/cat2.PNG';
import cat3 from '../media/cat3.PNG';
// import cat4 from '../../src/media/cat4.PNG';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
  },
  header: {
    height: '4.5em',
    paddingTop: '0.5em',
    textAlign: 'left',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
  },
  tags: {
    width: '100%',
    display: 'inline-block',
    textAlign: 'left',
  },
  menu: {
    display: 'inline-block',
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
  },
  location: {
    paddingTop: '0.25em',
    paddingBottom: '0.25em',
    cursor: 'pointer',
  },
  postMenu: {
    zIndex: 5,
  },
  media: {
    position: 'relative',
    backgroundColor: 'black',
    width: '100%',
    
    // 모바일 ver, pc ver 높이 필요할 듯
  },
  content: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    textAlign: 'left',
  },
  files: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  etc: {
    height: '2.5em',
    marginTop: '0.25em',
    marginBottom: '0.5em',
    textAlign: 'left',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PostMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Menu color="action" />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 1 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper className={classes.postMenu}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>수정</MenuItem>
                    <MenuItem onClick={handleClose}>수정 내역</MenuItem>
                    <MenuItem onClick={handleClose}>삭제</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

const MediaList = (props) => {
  const classes = useStyles();
  const {mediaList} = props;

  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  let height = isPc ? '60em' : isTablet ? '45em' : '30em';
  // 기본 너비는 유드리있게

  return (
    <Box id="mediaBox" textAlign="center">
      <Carousel autoPlay={false} animation="slide" cycleNavigation={false}>

      {mediaList ? mediaList.map((item, index) => (
        <Box className={classes.media} height={height}>
          
          <Media content={item}/>
        </Box>
      )
      
      ) : null} 

        
        {/* <Box className={classes.media} height={size}>
          <Media content={cat2}/>
        </Box>
        <Box className={classes.media} height={size}>
          <Media content={cat3}/>
        </Box> */}

        {/* <Box className={classes.media}>
            <Media content={piano}></Media>
        </Box> */}
      </Carousel>
    </Box>
  );
};

export const Post = (props) => {
    const MAX_COMMENT_SIZE = 2;
    const { postContents, maxWidth } = props;

    const [tagList, setTagList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [mediaList, setMediaList] = useState([]);

    const classes = useStyles();

    useEffect(() => {
      setTagList(postContents.post_tag);
      setCommentList(postContents.comment_list);
      setMediaList(postContents.media_list);

      var slides = document.getElementsByClassName('media');

      var pcDevice = 'win16|win32|win64|mac|macintel';

      if (navigator.platform) {
        if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
          // console.log('MOBILE');
        } else {
          // console.log('PC');
        }
      }
    }, []);

  return (
    <Container component="main" maxWidth={maxWidth} disableGutters>
      <CssBaseline />
      <Box className={classes.paper}>
        <Container disableGutters>
          <Box bgcolor="rgb(245, 212, 255)">
            <Box className={classes.header}>
              <Box display="inline-block" marginLeft="0.25em">
                <Box>
                  <UserInfo
                    userId={postContents.writer_user_id}
                    imgWidth="30px"
                    imgHeight="30px"
                    // imgPath={ogu}
                    fontSize="16px"
                  />
                </Box>
                <Box>
                  <DateInfo year="2021" month="04" date="06" fs="12px" />
                </Box>
              </Box>

              <Box className={classes.menu}>
                <PostMenu />
              </Box>
            </Box>
          </Box>
        </Container>
        <Container disableGutters>
          <Box className={classes.location}>
            <RoomIcon />
            {postContents.location}
          </Box>
        </Container>
        <Container disableGutters>
          <Box>
            <Box className={classes.tags}>
              {tagList
                ? tagList.map((item, index) => <Tag name={item.name} />) : null}
            </Box>
          </Box>
        </Container>
        <Container disableGutters>
          <MediaList mediaList = {mediaList}/>
        </Container>
        <Container disableGutters>
          <Box className={classes.content}>
            <Typography>{postContents.contents}</Typography>
          </Box>
        </Container>
        <Container disableGutters>
          <Box className={classes.files}>
            <File file="오구.jpg" />
          </Box>

          <Box className={classes.etc}>
            <LikerCounter count={postContents.post_liker_count} />
            <CommentCounter count={postContents.comment_count} />
          </Box>
        </Container>
        <Container disableGutters>
          {commentList
            ? commentList.map((item, index) => {
              if(index < MAX_COMMENT_SIZE){
                return (
                  <Comment
                    userId={item.writer_user_id}
                    userTag="null"
                    // imgPath={ogu}
                    comment_mention_list={item.comment_mention_list}
                    content={item.contents}
                    parent_comment_id={item.parent_comment_id}
                  />
                );
              }

              if(index === MAX_COMMENT_SIZE){
                return (<MoreComment />);
              }
            })
            : ''}
        </Container>
        <Container disableGutters>
          <CommentForm
            options={[
              '신동헌',
              '신현정',
              '이희수',
              '윤진',
              '오득환',
              '이현아',
              '김사람',
              '이사람',
              '강소공',
              'Zaki Mars Stewart',
              '박지훈',
              '박소공',
              '김소공',
              '김시관',
              '김성렬',
              '김선명',
              '김민종',
              '김효진',
              '김초코',
              '김커피',
              '김생수',
              '김에어',
              '김지현',
            ]}
          />
        </Container>
      </Box>
    </Container>
  );
};