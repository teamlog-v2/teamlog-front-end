import {
  Delete,
  Edit,
  History,
  MoreVert
} from '@mui/icons-material';
import RoomIcon from '@mui/icons-material/Room';
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { makeStyles } from '@mui/styles';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import Carousel from 'react-material-ui-carousel';
import { useMediaQuery } from 'react-responsive';
import './css/carousel-theme.css';
import './css/carousel.css';

import { Route } from 'react-router';
import CommentList from '../comment/commentlist';
import { DateInfo } from '../global/datetime';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import MyPage from '../user/MyPage';
import { convertResourceUrl } from '../utils';
import { CommentCounter, LikerCounter } from './Counter';
import FileList from './FileList';
import PostFormPage from './PostFormPage';
import { Media, Video } from './PostMedia';
import UpdateHistory from './PostUpdateHistory';
import { UserId, UserImage } from './UserProfile';
import { DeletePost } from './postApi';

/** 관계와 접근제어자를 입력받아서
 * visible 한지 반환
 */
const canAccess = (relation, modifier) => (
  modifier === 'PUBLIC' || relation === 'MEMBER' || relation === 'MASTER'
);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5.5% 0',
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      padding: '2.5%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1.5%',
    },
  },
  chip: {
    zIndex: 1,
    position: 'absolute',
    padding: '3px 10px',
    borderRadius: '500px',
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
      fontSize: '11px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0.5%',
      fontSize: '14px',
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
    [theme.breakpoints.down('sm')]: {
      right: 0,
    },
    [theme.breakpoints.up('md')]: {
      right: 0,
    },
    cursor: 'pointer',
    position: 'absolute',
  },
  postMenu: {
    zIndex: 3,
    position: 'absolute',
    right: -10,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const anchorRef = useRef(null);
  const {
    content,
    setIsPostLoading,
    setFormData,
    initPosts,
    updateOpen,
    updateHistoryOpen,
  } = props;

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    }
  };

  const handlePostDelete = async (event) => {
    const status = await DeletePost(content.id);
    if (status === 200) {
      setIsPostLoading(false);
      setFormData(null);
      initPosts();
    }
    setAlertOpen(false);
  };

  const prevOpen = useRef(menuOpen);
  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={menuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVert color="action" fontSize="small" />
        </IconButton>
        <Popper
          open={menuOpen}
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
                zIndex: 3,
              }}
            >
              <Paper
                className={classes.postMenu}
                style={{ zIndex: 2 }}
                elevation={1}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={menuOpen}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => {
                        if (!updateOpen) return;
                        updateOpen(true);
                      }}
                    >
                      <Edit />
                      &nbsp;<strong>포스트 수정</strong>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        updateHistoryOpen(true);
                      }}
                    >
                      <History />
                      &nbsp;<strong>수정 내역</strong>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAlertOpen(true);
                      }}
                    >
                      <Delete />
                      &nbsp;<strong>포스트 삭제</strong>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Dialog
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">포스트 삭제</DialogTitle>
        <DialogContent style={{ width: 200, textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description">
            정말로 삭제할까요?
          </DialogContentText>
        </DialogContent>
        <Grid container direction="row" justify="space-evenly">
          <Button onClick={handlePostDelete} color="primary" autoFocus>
            삭제
          </Button>
          <Button
            onClick={() => {
              setAlertOpen(false);
            }}
            color="primary"
          >
            취소
          </Button>
        </Grid>
      </Dialog>
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
        <span className={classes.chip}>{`${curIndex}/${media.length}`}</span>
      </Grid>
      <Box id="mediaBox" textAlign="center">
        <Carousel
          onChange={(index) => {
            setCurIndex(index + 1);
          }}
          autoPlay={false}
          animation="slide"
          cycleNavigation={false}
          indicatorIconButtonProps={{}}
          indicators={false}
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
  const {
    content,
    maxWidth,
    setIsPostLoading,
    setFormData,
    initPosts,
    relation,
    updatePost,
    hashtags: projectHashtags,
  } = props;

  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

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
    setCommentCounter(content.commentCount);
    setLikerCounter(content.likeCount);
  }, [content.id]);

  return (
    <>
      <Route exact path="/accounts/:userId" component={MyPage} />
      <Container
        className={classes.root}
        component="main"
        disableGutters
        maxWidth={maxWidth}
      >
        <Card className={classes.paper} elevation={0}>
          <Container disableGutters>
            <Box className={classes.children}>
              <Grid
                container
                className={classes.header}
                xs={12}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Grid container className={classes.user} alignItems="center">
                    <Grid item>
                      <UserImage imgPath={content.writer.profileImgPath} />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={2}
                      style={{ padding: '0 1%' }}
                    >
                      <UserId userId={content.writer.id} />
                      <DateInfo dateTime={content.writeTime} />
                    </Grid>
                  </Grid>
                </Grid>
                {relation === 'MEMBER' || relation === 'MASTER' ? (
                  <Grid item className={classes.menu}>
                    <PostMenu
                      content={content}
                      setIsPostLoading={setIsPostLoading}
                      setFormData={setFormData}
                      initPosts={initPosts}
                      updateOpen={setOpen}
                      updateHistoryOpen={setHistoryOpen}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </Container>
          {canAccess(relation, content.accessModifier) ? (
            <>
              {content.address ? (
                <Grid
                  className={classes.children}
                  container
                  alignItems="center"
                >
                  <Grid container alignItems="center">
                    <RoomIcon color="primary" />
                    <span style={{ fontWeight: 600 }}>
                      {content.address.split('#')[0]}
                    </span>
                  </Grid>
                </Grid>
              ) : null}
              {content?.hashtags.length > 0 ? (
                <Grid className={classes.children}>
                  <Grid container direction="row" spacing={1}>
                    {content.hashtags.map((item, index) => (
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
                    ))}
                  </Grid>
                </Grid>
              ) : null}
              {content.files.length !== 0 && (
                <Grid className={classes.children}>
                  <FileList files={content.files} />
                </Grid>
              )}
              {content.media.length !== 0 && (
                <MediaList media={content.media} />
              )}
              <Box className={classes.children}>
                <p
                  style={{
                    wordBreak: 'break-all',
                    margin: '0 0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {content.contents}
                  {/* {
                    (content.contents.indexOf('https://') !== -1) && (
                    <a href={content.contents.substring(content.contents.indexOf('http://'))}>
                      {content.contents.substring(content.contents.indexOf('http://'))}
                    </a>
                    )
                  } */}
                </p>
              </Box>
              <Divider style={{ margin: '0.5% 1%' }} />
              <Box className={classes.children}>
                <LikerCounter
                  count={likerCounter}
                  setLikerCounter={SetLikerCounter}
                  postId={content.id}
                />
                &nbsp;
                <CommentCounter count={commentCounter} />
              </Box>
              {canAccess(relation, content.commentModifier) ? (
                <Container disableGutters>
                  <CommentList
                    projectId={content.project.id}
                    postId={content.id}
                    setCommentCounter={SetCommentCounter}
                  />
                </Container>
              ) : (
                <span
                  style={{
                    backgroundColor: '#F8F8F8',
                    textAlign: 'center',
                    padding: '1% 0',
                    fontSize: 'smaller',
                  }}
                >
                  댓글을 볼 수 있는 권한이 없습니다
                </span>
              )}
            </>
          ) : (
            <Grid
              style={{
                backgroundColor: '#F8F8F8',
                textAlign: 'center',
                padding: '10% 0',
              }}
            >
              포스트를 볼 수 있는 권한이 없습니다
            </Grid>
          )}
          <Container disableGutters />
        </Card>
      </Container>
      <ResponsiveDialog open={open} updateOpen={setOpen}>
        <PostFormPage
          content={content}
          hashtags={projectHashtags} // 임시 빈값
          updateOpen={setOpen}
          updatePost={updatePost}
        />
      </ResponsiveDialog>
      <Dialog
        open={historyOpen}
        updateOpen={setHistoryOpen}
        onClose={() => {
          setHistoryOpen(false);
        }}
      >
        <UpdateHistory id={content.id} updateOpen={setHistoryOpen} />
      </Dialog>
    </>
  );
};

const CompressedMediaList = ({ media }) => {
  const classes = useStyles();

  const [curIndex, setCurIndex] = useState(1);

  return (
    <>
      <Grid container direction="row-reverse">
        {/* <span className={classes.chip}>{`${curIndex}/${media.length}`}</span> */}
      </Grid>
      <Box id="mediaBox" textAlign="center">
        <Carousel
          onChange={(index) => {
            setCurIndex(index + 1);
          }}
          autoPlay={false}
          animation="slide"
          cycleNavigation={false}
          indicatorIconButtonProps={{}}
          indicators={false}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#C16AF5', // 2
            },
          }}
        >
          {media.map((file, i) => {
            const { fileDownloadUri } = file;
            const url = fileDownloadUri.slice(
              fileDownloadUri.indexOf('/resources'),
            );

            if (file.contentType.includes('video')) {
              return (
                <Video file={file} compressed />
              );
            }

            if (file.contentType.includes('image')) {
              return (
                <img
                  key={url}
                  src={convertResourceUrl(url)}
                  alt="이미지"
                  width="100%"
                />
              );
            }

            return null;
          })}
        </Carousel>
      </Box>
    </>
  );
};

export const CompressedPost = (props) => {
  const { post, noTime, type } = props;

  const [historyOpen, setHistoryOpen] = useState(false);

  const classes = useStyles();
  const [likerCounter, setLikerCounter] = useState(post.likeCount);
  const [commentCounter, setCommentCounter] = useState(post.commentCount);

  const SetCommentCounter = useCallback((counterEvent) => {
    setCommentCounter(commentCounter + counterEvent);
  }); // 댓글 개수 조정

  const SetLikerCounter = useCallback((counterEvent) => {
    setLikerCounter(likerCounter + counterEvent);
  }); // 좋아요 개수 조정

  useEffect(() => {
    setCommentCounter(post.commentCount);
    setLikerCounter(post.likeCount);
  }, [post.id]);

  return (
    <>
      <Container className={type ? classes.root : ''} disableGutters>
        <Card className={classes.paper} elevation={0}>
          <Container disableGutters>
            <Box className={classes.children}>
              <Grid
                container
                className={classes.header}
                xs={12}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Grid container className={classes.user} alignItems="center">
                    <Grid item>
                      <UserImage imgPath={post.writer.profileImgPath} />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={2}
                      style={{ padding: '0 1%' }}
                    >
                      <UserId userId={post.writer.id} />
                      {!noTime && <DateInfo dateTime={post.writeTime} />}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <>
            {post.address ? (
              <Grid className={classes.children} container alignItems="center">
                <Grid container alignItems="center">
                  <RoomIcon color="primary" />
                  <span style={{ fontWeight: 600 }}>
                    {post.address.split('#')[0]}
                  </span>
                </Grid>
              </Grid>
            ) : null}
            {post?.hashtags.length > 0 ? (
              <Grid className={classes.children}>
                <Grid container direction="row" spacing={1}>
                  {post.hashtags.map((item, index) => (
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
                  ))}
                </Grid>
              </Grid>
            ) : null}
            {post.files.length !== 0 && (
              <Grid className={classes.children}>
                <FileList files={post.files} />
              </Grid>
            )}
            {post.media.length !== 0 && (
              <CompressedMediaList media={post.media} />
            )}
            <Box className={classes.children}>
              <p
                style={{
                  // wordBreak: 'break-all',
                  margin: '0 0',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {post.contents}
              </p>
            </Box>
            <Divider style={{ margin: '0.5% 1%' }} />
            <Box className={classes.children}>
              <LikerCounter
                count={likerCounter}
                setLikerCounter={SetLikerCounter}
                postId={post.id}
              />
              &nbsp;
              <CommentCounter count={commentCounter} />
            </Box>

            <Container disableGutters>
              <CommentList
                projectId={post.project.id}
                postId={post.id}
                setCommentCounter={SetCommentCounter}
                type="compressed"
              />
            </Container>
          </>
          <Container disableGutters />
        </Card>
      </Container>
      {/* 다이얼로그 */}
      <Dialog
        open={historyOpen}
        updateOpen={setHistoryOpen}
        onClose={() => {
          setHistoryOpen(false);
        }}
      >
        <UpdateHistory id={post.id} updateOpen={setHistoryOpen} />
      </Dialog>
    </>
  );
};
