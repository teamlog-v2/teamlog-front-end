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
import { AmpStories, Block, Menu } from '@material-ui/icons';
import { Button, Chip, Grid } from '@material-ui/core';

import FileList from './fileList';
import { CommentList } from './commentlist';
import UserInfo from './user';
import LikerCounter from './liker';
import { Media } from './media';
import { DateInfo } from './datetime';
import MyPage from '../user/MyPage';
import { Comment, CommentCounter, MoreComment } from './comment';
import { Route } from 'react-router';

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
    // '&::after': {
    //   content: '',
    //   display: 'block',
    //   paddingBottom: '100%',
    // }
    // 모바일 ver, pc ver 높이 필요할 듯
  },
  temp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
  },
  content: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '0.25em'
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
    marginLeft: '0.25em',
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
    const { postContents, maxWidth } = props;

    const [tagList, setTagList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const classes = useStyles();

    useEffect(() => {
      setTagList(postContents.hashtags);
    }, []);

    console.log(postContents);

  return (
    <>
    <Route exact path="/users/:userId" component={MyPage} />
    <Container className={classes.root} component="main" disableGutters madWidth={maxWidth}>
      <CssBaseline />
      <Box className={classes.paper}>
        <Container disableGutters>
          <Box bgcolor="rgb(245, 212, 255)">
            <Box className={classes.header}>
              <Box display="inline-block" marginLeft="0.25em">
                <Box>
                  <UserInfo
                    userId={postContents.writer.name}
                    imgWidth="30px"
                    imgHeight="30px"
                    imgPath={postContents.writer.profileImgPath}
                    fontSize="16px"
                  />
                </Box>
                <Box>
                  <DateInfo dateTime = {postContents.writeTime} fs="12px" />
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
            {postContents.latitude}
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
          <Box className={classes.files}>
            <FileList className={classes.file} files={postContents.files}/>
          </Box>

          <Box className={classes.etc}>
            <LikerCounter count={postContents.likeCount} />
            <CommentCounter count={postContents.commentCount} />
          </Box>
        </Container>
        <Container disableGutters>
          <CommentList projectId = {postContents.project.id} postId = {postContents.id} /> 
        </Container>
        <Container disableGutters>
        </Container>
      </Box>
    </Container>
    </>
  );
};