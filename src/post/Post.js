import {
  Delete,
  Edit,
  ExpandMore,
  History,
  MoreVert
} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Dialog,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { makeStyles } from '@mui/styles';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import Carousel from 'react-material-ui-carousel';
import './css/carousel-theme.css';
import './css/carousel.css';

import { Container } from '@mui/system';
import CommentList from '../comment/commentlist';
import { DateInfo } from '../global/datetime';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import { CommentCounter, LikerCounter } from './Counter';
import PostForm from './PostFormPage';
import { Media } from './PostMedia';
import UpdateHistory from './PostUpdateHistory';
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
    height: '50vh',
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
  const anchorRef = useRef(null);
  const {
    content,
    setIsPostLoading,
    setFormData,
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
      window.location.reload(true);
    }
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
                      &nbsp;<Typography>포스트 수정</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        updateHistoryOpen(true);
                      }}
                    >
                      <History />
                      &nbsp;<Typography>수정 내역</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        if (window.confirm('정말로 삭제할까요?')) {
                          handlePostDelete();
                        }
                      }}
                    >
                      <Delete />
                      &nbsp;<Typography>포스트 삭제</Typography>
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
  const containerStyle = {
    width: '80%', // Set the width of the container as needed
    margin: 'auto', // Center the container
    position: 'relative', // Set position to relative
  };

  const carouselContainerStyle = {
    width: '100%', // Set the width of the Carousel to 100% of its container
    position: 'relative',
  };

  const carouselStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={carouselContainerStyle}>
        <Carousel style={carouselStyle}>
          {/* Your Carousel items go here */}
          {media.map((item, i) => (
            <div style={{ display: 'flex', maxWidth: '100%' }}>
              <div
                style={{
                  width: '100%', // 조절 가능한 폭
                  paddingTop: '100%', // 1:1의 측면 비율을 갖기 위한 높이
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Media key={i} file={item} />
                </div>
              </div>
            </div>
            // <Box>
            //   <Media key={i} file={item} />
            // </Box>
          ))}
        </Carousel>
      </div>
    </div>
  );

  // const classes = useStyles();

  // const [curIndex, setCurIndex] = useState(1);

  // const isPc = useMediaQuery({
  //   query: '(min-width:1024px)',
  // });
  // const isTablet = useMediaQuery({
  //   query: '(min-width:768px) and (max-width:1023px)',
  // });
  // const isMobile = useMediaQuery({
  //   query: '(max-width:767px)',
  // });



  // return (
  //   <div style={{
  //     width: '100%', // Set the width of the container as needed
  //     margin: 'auto', // Center the container
  //     position: 'relative', // Set position to relative
  //   }}>
  //     < div style={{
  //       width: '100%', // Set the width of the Carousel to 100% of its container
  //       position: 'relative',
  //     }}>
  //       <Grid container direction="row-reverse">
  //         <span className={classes.chip}>{`${curIndex}/${media.length}`}</span>
  //       </Grid>
  //       <Box id="mediaBox" textAlign="center" >
  //         <Carousel
  //           onChange={(index) => {
  //             setCurIndex(index + 1);
  //           }}
  //           autoPlay={false}
  //           animation="slide"
  //           cycleNavigation={false}
  //           indicators={false}

  //           activeIndicatorIconButtonProps={{
  //             style: {
  //               color: '#C16AF5', // 2
  //             },
  //           }}
  //         >

  //         </Carousel>
  //       </Box>
  //     </div>
  //   </div >
  // );
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

  const updateCommentCount = useCallback((counterEvent) => {
    setCommentCounter(commentCounter + counterEvent);
  }); // 댓글 개수 조정

  const SetLikerCounter = useCallback((counterEvent) => {
    setLikerCounter(likerCounter + counterEvent);
  }); // 좋아요 개수 조정

  useEffect(() => {
    setCommentCounter(content.commentCount);
    setLikerCounter(content.likeCount);
  }, [content.id]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container disableGutters maxWidth={maxWidth}>
      <Card width='md'>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={content.writer.profileImgPath} />
          }
          action={
            <IconButton aria-label="settings">
              <PostMenu
                content={content}
                setIsPostLoading={setIsPostLoading}
                setFormData={setFormData}
                updateOpen={setOpen}
                updateHistoryOpen={setHistoryOpen}
              />
            </IconButton>
          }
          title={content.writer.id}
          subheader={<DateInfo dateTime={content.writeTime} />}
        />
        {content.media.length !== 0 && (
          <MediaList media={content.media} />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content.contents}
          </Typography>
        </CardContent>
        <CardContent>
          {content?.hashtags.length > 0 ? (
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
          ) : null}
        </CardContent>
        <CardContent disableSpacing>
          <LikerCounter
            count={likerCounter}
            setLikerCounter={SetLikerCounter}
            postId={content.id}
          />
        </CardContent>
        <CardContent disableSpacing>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CommentCounter count={commentCounter} />
            <Typography variant="body2" color="text.secondary" style={{ marginLeft: '0.25em', display: 'flex' }}> {expanded ? '댓글 접기' : '댓글 펼쳐보기'}</Typography>
            <ExpandMore
              style={{ cursor: 'pointer' }}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            />
          </div>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {console.log(content.id)}
          <CommentList
            projectId={content.project.id}
            postId={content.id}
            updateCommentCount={updateCommentCount}
          />
        </Collapse>
        <ResponsiveDialog open={open} updateOpen={setOpen}>
          <PostForm
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
      </Card>
    </Container>
    // <>
    //   <Route exact path="/accounts/:accountId" component={MyPage} />
    //   <Container
    //     className={classes.root}
    //     component="main"
    //     disableGutters
    //     maxWidth={maxWidth}
    //   >
    //     <Card className={classes.paper} elevation={0}>
    //       <Container disableGutters>
    //         <Box className={classes.children}>
    //           <Grid
    //             container
    //             className={classes.header}
    //             xs={12}
    //             direction="row"
    //             alignItems="center"
    //           >
    //             <Grid item xs={10}>
    //               <Grid container className={classes.account} alignItems="center">
    //                 <Grid item>
    //                   <AccountImage imgPath={content.writer.profileImgPath} />
    //                 </Grid>
    //                 <Grid
    //                   item
    //                   container
    //                   direction="column"
    //                   xs={2}
    //                   style={{ padding: '0 1%' }}
    //                 >
    //                   <AccountId accountId={content.writer.id} />
    //                   <DateInfo dateTime={content.writeTime} />
    //                 </Grid>
    //               </Grid>
    //             </Grid>
    //             {relation === 'MEMBER' || relation === 'MASTER' ? (
    //               <Grid item className={classes.menu}>
    //                 <PostMenu
    //                   content={content}
    //                   setIsPostLoading={setIsPostLoading}
    //                   setFormData={setFormData}
    //                   initPosts={initPosts}
    //                   updateOpen={setOpen}
    //                   updateHistoryOpen={setHistoryOpen}
    //                 />
    //               </Grid>
    //             ) : null}
    //           </Grid>
    //         </Box>
    //       </Container>
    //       {canAccess(relation, content.accessModifier) ? (
    //         <>
    //           {content.address ? (
    //             <Grid
    //               className={classes.children}
    //               container
    //               alignItems="center"
    //             >
    //               <Grid container alignItems="center">
    //                 <RoomIcon color="primary" />
    //                 <span style={{ fontWeight: 600 }}>
    //                   {content.address.split('#')[0]}
    //                 </span>
    //               </Grid>
    //             </Grid>
    //           ) : null}
    //           {content.files.length !== 0 && (
    //             <Grid className={classes.children}>
    //               <FileList files={content.files} />
    //             </Grid>
    //           )}
    //           {content.media.length !== 0 && (
    //             <MediaList media={content.media} />
    //           )}
    //           <Box className={classes.children}>
    //             <p
    //               style={{
    //                 wordBreak: 'break-all',
    //                 margin: '0 0',
    //                 whiteSpace: 'pre-wrap',
    //               }}
    //             >
    //               {content.contents}
    //               {/* {
    //                 (content.contents.indexOf('https://') !== -1) && (
    //                 <a href={content.contents.substring(content.contents.indexOf('http://'))}>
    //                   {content.contents.substring(content.contents.indexOf('http://'))}
    //                 </a>
    //                 )
    //               } */}
    //             </p>
    //           </Box>
    //           <Divider style={{ margin: '0.5% 1%' }} />
    //           <Box className={classes.children}>
    //             <LikerCounter
    //               count={likerCounter}
    //               setLikerCounter={SetLikerCounter}
    //               postId={content.id}
    //             />
    //             &nbsp;
    //             <CommentCounter count={commentCounter} />
    //           </Box>
    //           {canAccess(relation, content.commentModifier) ? (
    //             <Container disableGutters>
    //               <CommentList
    //                 projectId={content.project.id}
    //                 postId={content.id}
    //                 updateCommentCount={updateCommentCount}
    //               />
    //             </Container>
    //           ) : (
    //             <span
    //               style={{
    //                 backgroundColor: '#F8F8F8',
    //                 textAlign: 'center',
    //                 padding: '1% 0',
    //                 fontSize: 'smaller',
    //               }}
    //             >
    //               댓글을 볼 수 있는 권한이 없습니다
    //             </span>
    //           )}
    //         </>
    //       ) : (
    //         <Grid
    //           style={{
    //             backgroundColor: '#F8F8F8',
    //             textAlign: 'center',
    //             padding: '10% 0',
    //           }}
    //         >
    //           포스트를 볼 수 있는 권한이 없습니다
    //         </Grid>
    //       )}
    //       <Container disableGutters />
    //     </Card>
    //   </Container>
    //   <ResponsiveDialog open={open} updateOpen={setOpen}>
    //     <PostFormPage
    //       content={content}
    //       hashtags={projectHashtags} // 임시 빈값
    //       updateOpen={setOpen}
    //       updatePost={updatePost}
    //     />
    //   </ResponsiveDialog>
    //   <Dialog
    //     open={historyOpen}
    //     updateOpen={setHistoryOpen}
    //     onClose={() => {
    //       setHistoryOpen(false);
    //     }}
    //   >
    //     <UpdateHistory id={content.id} updateOpen={setHistoryOpen} />
    //   </Dialog>
    // </>
  );
};

export default Post;
