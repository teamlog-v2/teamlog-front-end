import {
  Box,
  Grid
} from '@mui/material';
import {
  makeStyles,
} from '@mui/styles';
import { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { DateInfo } from '../global/datetime';
import { UserId, UserImage } from '../post/UserProfile';
import CommentForm from './commentform';
import { DeleteComment } from './commentapi';

const useStyles = makeStyles((theme) => ({
  more: {
    marginLeft: '0.25em',
    color: 'rgb(180, 180, 180)',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    cursor: 'pointer',
  },
  comment: {
    textAlign: 'left',
  },
  reply: {
    // display='inline-block' right='0px' width='10%' textAlign='right'
    display: 'inline-block',
    right: '0px',
    width: '40%',
    textAlign: 'right',
  },
  userInfo: {
    width: '60%',
    display: 'inline-block',
    backgroundColor: 'rgb(245, 245, 245)',
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
  commentGrid: {
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      margin: '0 2%',
    },
    [theme.breakpoints.up('md')]: {
      width: '90%',
      margin: '0 1%',
    },
  }
}));

const Content = (props) => {
  const { writer, writeTime, funcs, visibility, contents, tagList } = props;

  const classes = useStyles();

  const stringSplit = contents.split(`\n`);

  return (
    // <Box display={visibility}>
    <>
      <Grid className={classes.commentGrid} item container direction="column" style={{ wordBreak: 'break-all' }}>
        {/* {writer}&nbsp; */}
        {stringSplit
          ? stringSplit.map((string, index) => {
            const wordSplit = string.split(' ');
            return <Grid container item alignItems="center">
              {index === 0 ? (writer) : <></>}
              {
                wordSplit.map((word) =>
                  (word[0] === '@' && tagList.includes(word.split('@')[1])) ?
                    <Link
                      to={`/accounts/${word.split('@')[1]}`}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      <span style={{ color: '#593875', fontWeight: 600 }}>{word.split('@')[1]}&nbsp;</span>
                    </Link>
                    : (<span>{word}&nbsp;</span>)
                )
              }
            </Grid>
          }
          )
          : []}
        <Grid container item direction="row" style={{ fontSize: 13, display: 'flex', gap: '1%' }} alignItems="center">
          {writeTime}
          {funcs}
        </Grid>
      </Grid>
    </>
    // </Box>
  );
};

const CheckRoot = (type) => {
  if (type === 'child') {
    return {
      marginLeft: '1.5em',
      buttonDisplay: 'hidden',
    };
  }

  return {
    marginLeft: '0.5em',
    buttonDisplay: 'block',
  };
};

const Comment = (props) => {
  const {
    id: commentId,
    projectId,
    postId,
    type,
    writeTime,
    writer,
    commentMentions,
    renewCommentList,
    contents,
  } = props;

  const [id] = useContext(AuthContext);
  const classes = useStyles();

  const [visibility, setVisibility] = useState({
    form: 'none',
    content: 'block',
  });
  const [forUpdate, setForUpdate] = useState(false);

  const commentStyle = CheckRoot(type);

  const RenewCommentList = useCallback(async (counterEvent) => {
    renewCommentList(counterEvent);
    setVisibility({
      form: 'none',
      content: 'block',
    });
  });

  return (
    <Box className={classes.comment}>
      <Box marginLeft={commentStyle.marginLeft}>
        <Box>
          <Grid container direction="row" xs={12} justify="space-between" style={{ margin: '1% 0' }}>
            <Grid item container direction="row" xs={12} alignItems="flex-start">
              <Grid item style={{ width: 35 }}>
                <UserImage imgPath={writer.profileImgPath} />
              </Grid>
              <Content
                writer={(<UserId userId={writer.id} />)}
                writeTime={<DateInfo dateTime={writeTime} />}
                funcs={(<>
                  {type === "parent" && id && (<span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setForUpdate(false);
                      if (visibility.form === 'none') {
                        setVisibility({
                          form: 'block',
                          content: 'block', // 대댓글 -> 수정 전환 대비
                        });
                      } else if (visibility.form === 'block' && visibility.content === 'none') {
                        setVisibility({
                          form: 'block',
                          content: 'block',
                        });
                      } else {
                        setVisibility({
                          form: 'none',
                          content: 'block',
                        });
                      }
                    }}
                  >
                    답글달기&nbsp;
                  </span>)}
                  {
                    writer.id === id && (<>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                          if (visibility.content === 'block') {
                            setForUpdate(true);
                            setVisibility({
                              form: 'block',
                              content: 'none',
                            });
                          } else {
                            setForUpdate(false);
                            setVisibility({
                              form: 'none',
                              content: 'block',
                            });
                          }
                        }}
                      >
                        수정하기&nbsp;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                          if (window.confirm('정말로 삭제하시겠습니까?')) {
                            const status = await DeleteComment(commentId);
                            if (status === 200) {
                              renewCommentList(-1);
                            }
                          }
                        }}
                      >
                        삭제하기&nbsp;
                      </span>
                    </>)
                  }
                </>)
                }
                visibility={visibility.content}
                contents={contents}
                tagList={commentMentions}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box display={visibility.form}>
        <CommentForm
          id={commentId}
          projectId={projectId}
          postId={postId}
          renewCommentList={RenewCommentList}
          contents={contents}
          forUpdate={forUpdate}
          setForUpdate={setForUpdate}
          parentWriterId={writer.id}
        />
      </Box>
    </Box>
  );
};

export default Comment;
