import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-material-ui-carousel';
import './carousel-theme.css';
import './carousel.css';
import RoomIcon from '@material-ui/icons/Room';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
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
import { Menu } from '@material-ui/icons';
import { Button, Chip, Grid } from '@material-ui/core';

import UserInfo from './user';
import LikerCounter from './liker';
import FileList from './fileList';
import { Media } from './media';
import { Comment, CommentCounter, CommentForm } from './comment';

// import dao from '../../src/media/dao.png';
import ogu from '../media/ogu.PNG';

const people = [
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
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5% 0',
  },
  children: {
    margin: '1% 0',
  },
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
    objectFit: 'contain',
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

const MediaList = ({ media }) => {
  const classes = useStyles();

  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  let size = isPc ? '60em' : isTablet ? '45em' : '30em';  
  return (
    <Box id="mediaBox" textAlign="center">
      <Carousel autoPlay={false} animation="slide" cycleNavigation={false}>
        {
          media.map((file) => ( <Box className={classes.media} height={size}>
            <Media file={file} />
            </Box>))
          }
      </Carousel>
    </Box>
  );
};

export const Post = (props) => {
    const { postContents } = props;

    // const [commentList, setCommentList] = useState([]);
    // 댓글 관련 일단 모두 주석처리

    const classes = useStyles();

    useEffect(() => {
    // setCommentList(postContents.comment);
    var slides = document.getElementsByClassName('media');

    // 밑에 주석친건 사실 쓸일이 있을지 아직 모르겠어여
    // var pcDevice = 'win16|win32|win64|mac|macintel';

    // if (navigator.platform) {
    //   if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
    //     console.log('MOBILE');
    //   } else {
    //     console.log('PC');
    //   }
    // } 
  }, []);

  return (
    <Container className={classes.root} component="main" disableGutters>
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
                    imgPath={ogu}
                    fontSize="16px"
                  />
                </Box>
                <Box>
                  {new Date(postContents.writeTime).toLocaleTimeString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
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
        <Grid className={classes.children}>
          <Grid container direction="row" spacing={1}>
            {postContents.hashtags
              ? postContents.hashtags.map((item, index) => {
                  return <Grid item>
                          <Chip
                          className="tags"
                          key={index}
                          label={`#${item}`}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            // handleChipClick(index);
                            // handleToggle(index);
                          }}
                          color="primary"
                          />
                        </Grid>
                  })
                : ''}
            </Grid>
        </Grid>
        {
          postContents.media.length === 0
            ? null
            : (<Container disableGutters>
                <MediaList media={postContents.media}/>
              </Container>)
        }
       
        <Container disableGutters>
          <Box className={classes.content}>
            <Typography>{postContents.contents}</Typography>
          </Box>
        </Container>
        <Container disableGutters>
          <FileList className={classes.file} files={postContents.files}/>
          <Box className={classes.etc}>
            <LikerCounter count={postContents.post_liker_count} />
            <CommentCounter count={postContents.comment_count} />
          </Box>
        </Container>
        <Divider />
        <Container disableGutters>
          {postContents.comment_list
            ? postContents.comment_list.map((item, index) => {
                return (
                  <Comment
                    userId={item.writer_user_id}
                    userTag="null"
                    imgPath={ogu}
                    comment_mention={item.comment_mention}
                    content={item.contents}
                    parent_comment_id={item.parent_comment_id}
                  />
                );
              })
            : ''}
        </Container>
        <Container disableGutters>
          <CommentForm
            options={people}
          />
        </Container>
      </Box>
    </Container>
  );
};
