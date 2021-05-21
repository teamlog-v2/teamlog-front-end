import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-material-ui-carousel';
import './carousel-theme.css';
import './carousel.css';
import RoomIcon from '@material-ui/icons/Room';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Menu } from '@material-ui/icons';
import { Avatar, Button, Card, Chip, Grid } from '@material-ui/core';

// import { Route } from 'react-router';
import FileList from './fileList';
import CommentList from '../comment/commentlist';
import { UserImage, UserId } from './user';
import { LikerCounter, CommentCounter } from './counter';
import { Media } from './media';
import { DateInfo } from './datetime';
// import MyPage from '../user/MyPage';
import { DeletePost } from './postapi';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import PostFormPage from '../pages/PostFormPage';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5% 0',
  },
  children: {
    padding: '1%',
  },
  chip: {
    zIndex: 1,
    position: 'absolute',
    padding: '3px 12px',
    borderRadius: '500px',
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0.5%',
    },
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee',
  },
  header: {
    position: 'relative',
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
    marginLeft: '0.25em',
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
  span: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.6,
    },
  },
}));

const PostMenu = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { content, setIsPostLoading, setFormData, initPosts, updateOpen } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

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
          style={{ zIndex: 2 }}
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
                    <MenuItem onClick={() => {
                      if (!updateOpen) return;
                      updateOpen(true);
                    }}
                    >
                      수정
                    </MenuItem>
                    <MenuItem onClick={handleClose}>수정 내역</MenuItem>
                    <MenuItem onClick={async (event) => {
                      if (window.confirm('정말로 삭제하시겠습니까?')) {
                        const status = await DeletePost(content.id);
                        if (status === 200) {
                          setIsPostLoading(false);
                          setFormData(null);
                          initPosts();
                        }
                      }
                      handleClose(event);
                    }}
                    >삭제
                    </MenuItem>
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

  const [curIndex, setCurIndex] = useState(1);

  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  let size = null;
  if (isPc) {
    size = '60em';
  } else if (isTablet) {
    size = '45em';
  } else if (isMobile) {
    size = '30em';
  }

  return (
    <>
      <Grid container direction="row-reverse">
        <span
          className={classes.chip}
        >
          {`${curIndex}/${media.length}`}
        </span>
      </Grid>
      <Box id="mediaBox" textAlign="center">
        <Carousel
          onChange={(index) => {
            setCurIndex(index + 1);
          }}
          autoPlay={false}
          animation="slide"
          cycleNavigation={false}
          indicatorIconButtonProps={{
          }}
          activeIndicatorIconButtonProps={{
              style: {
                  color: '#C16AF5', // 2
              },
          }}
        >
          {media.map((item, i) => (
            <Box className={classes.media} height={size}>
              <Media key={i} file={item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export const Post = (props) => {
  const { postContents, maxWidth, setIsPostLoading, setFormData, initPosts } = props;
  // const { userId } = useContext(SignContext);
  // 정적값으로 대체
  const userId = 'migu554';
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(postContents);

  const classes = useStyles();
  const [likerCounter, setLikerCounter] = useState(content.likeCount);
  const [commentCounter, setCommentCounter] = useState(content.commentCount);

  const SetCommentCounter = useCallback((counterEvent) => {
    setCommentCounter(commentCounter + counterEvent);
  }); // 댓글 개수 조정

  const SetLikerCounter = useCallback((counterEvent) => {
    setLikerCounter(likerCounter + counterEvent);
  }); // 좋아요 개수 조정

  useEffect(() => {
    setCommentCounter(postContents.commentCount);
    setLikerCounter(postContents.likeCount);
  }, [postContents.id]);

  useEffect(() => {
    setContent(postContents);
  }, [props]);

  return (
    <>
      {/* <Route exact path="/users/:userId" component={MyPage} /> */}
      <Container
        className={classes.root}
        component="main"
        disableGutters
        maxWidth={maxWidth}
      >
        <Card className={classes.paper} elevation={0}>
          <Container disableGutters>
            <Box className={classes.children}>
              <Grid container className={classes.header} xs={12} direction="row">
                <Grid item xs={10}>
                  <Grid container className={classes.user} alignItems="center">
                    <Grid item>
                      <UserImage imgPath={content.writer.profileImgPath} />
                    </Grid>
                    <Grid item container direction="column" xs={2} style={{ padding: '0 1%' }}>
                      <UserId userId={content.writer.id} />
                      <DateInfo dateTime={content.writeTime} />
                    </Grid>
                  </Grid>
                </Grid>
                {
                  userId === content.writer.id
                  ? (
                    <Grid item className={classes.menu} xs={2}>
                      <PostMenu
                        content={content}
                        setIsPostLoading={setIsPostLoading}
                        setFormData={setFormData}
                        initPosts={initPosts}
                        updateOpen={setOpen}
                      />
                    </Grid>
                  ) : null
                }
              </Grid>
            </Box>
          </Container>
          <Grid className={classes.children} container alignItems="center">
            <RoomIcon color="primary" />
            {content.latitude}
            {content.longitude}
          </Grid>
          <Grid className={classes.children}>
            <Grid container direction="row" spacing={1}>
              {content.hashtags
                ? content.hashtags.map((item, index) => {
                    return (
                      <Grid item>
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
                    );
                  })
                : ''}
            </Grid>
          </Grid>
          {
            content.files.length !== 0 && (
              <FileList files={content.files} />
            )
          }
          {content.media.length === 0 ? null : (
            <Container disableGutters>
              <MediaList media={content.media} />
            </Container>
          )}
          <Container disableGutters>
            <Box className={classes.content}>
              <Typography>
                <p style={{ whiteSpace: 'pre-wrap' }}>{content.contents}</p>
              </Typography>
            </Box>
          </Container>
          <Container disableGutters>
            <Box className={classes.etc}>
              <LikerCounter
                count={likerCounter}
                setLikerCounter={SetLikerCounter}
                postId={content.id}
              />
              <CommentCounter count={commentCounter} />
            </Box>
          </Container>
          <Container disableGutters>
            <CommentList
              projectId={content.project.id}
              postId={content.id}
              setCommentCounter={SetCommentCounter}
            />
          </Container>
          <Container disableGutters />
        </Card>
      </Container>
      <ResponsiveDialog open={open} updateOpen={setOpen}>
        <PostFormPage
          content={content}
          updateContent={setContent}
          updateOpen={setOpen}
        />
      </ResponsiveDialog>
    </>
  );
};

export const CompressedPost = (props) => {
  const { post } = props;
  const classes = useStyles();

  return (
    <>
      {/* 사용자 정보 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '16px',
        }}
      >
        <Avatar src={post.writer.profileImgPath} />
        <Typography>{post.writer.name}</Typography>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          margin: '16px',
        }}
      >
        <Carousel useKeyboardArrows autoPlay={false} showStatus={false} showThumbs={false}>
          {post.media.map((file) => (
            <Box key={file.fileDownloadUri} className={classes.media} height="30em">
              <Media file={file} />
            </Box>
        ))}
        </Carousel>

        {/* 날짜 */}
        <DateInfo dateTime={post.writeTime} fs="12px" />

        {/* 해쉬태그들 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {post.hashtags.map((item) => {
          return (
            <Chip
              className="tags"
              key={item}
              label={`#${item}`}
              variant="outlined"
              size="small"
              color="primary"
            />
          );
        })}
        </div>

        {/* 본문 */}
        <Typography>{post.contents}</Typography>

        {/* 첨부 파일 및 좋아요 댓글 개수 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <FileList className={classes.file} files={post.files} />
          <LikerCounter count={post.likeCount} />
          <CommentCounter count={post.commentCount} />
        </div>

        {/* 댓글 */}
        {/* <CommentList projectId={post.project.id} postId={post.id} /> */}
      </div>
    </>
  );
};
