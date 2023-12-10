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
import { DeleteComment, GetChildComment } from './commentapi';
import CommentForm from './commentform';

const useStyles = makeStyles((theme) => ({
  children: {
    [theme.breakpoints.down('sm')]: {
      padding: '2.5%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '2.5% 0 0 0',
    },
  },
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
  const { writer, writeTime, funcs, contents, tagList } = props;

  const classes = useStyles();
  const stringSplit = contents.split(`\n`);

  return (
    <Grid item container direction="column" style={{ wordBreak: 'break-all' }}>
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
        }) :
        []}
      <Grid container item direction="row" style={{ fontSize: 13, display: 'flex', gap: '1%' }} alignItems="center">
        {writeTime}
        {funcs}
      </Grid>
    </Grid>
  );
};

const Comment = (props) => {
  const {
    id,
    projectId,
    postId,
    writeTime,
    writer,
    commentMentions,
    renewCommentList,
    contents,
    childCommentCount
  } = props;

  const [userId] = useContext(AuthContext);
  const [remainCount, setRemainCount] = useState(childCommentCount);

  const chunkSize = 5;
  const [page, setPage] = useState(0);
  const [commentList, setCommentList] = useState([]);

  const classes = useStyles();

  const [visibility, setVisibility] = useState({
    form: 'none',
    content: 'block',
  });
  const [forUpdate, setForUpdate] = useState(false);

  const loadMoreCommentList = async () => {
    if (remainCount === 0) return;

    const response = await GetChildComment(id, page, chunkSize);
    setCommentList([...commentList, ...response.content])

    if (response.last) {
      setRemainCount(0);
    } else {
      setRemainCount(remainCount - chunkSize);
      setPage(page + 1);
    }
  }

  const RenewCommentList = useCallback(async (counterEvent) => {
    renewCommentList(counterEvent);
    setVisibility({
      form: 'none',
      content: 'block',
    });
  });

  return (
    <>
      <Box>
        <Grid container xs={12} className={classes.children}>
          <Grid item>
            <UserImage imgPath={writer.profileImgPath} />
          </Grid>
          <Grid className={classes.commentGrid}>
            <Content
              writer={(<UserId userId={writer.id} />)}
              writeTime={<DateInfo dateTime={writeTime} />}
              funcs={(<>
                {userId && (<span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setForUpdate(false);
                    if (visibility.form === 'none') {
                      setVisibility({
                        form: 'block',
                        content: 'block',
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
                  writer.id === userId && (<>
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
                          const status = await DeleteComment(id);
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
            {commentList ?
              commentList.map((item) => (
                <Comment id={item.id}
                  projectId={projectId}
                  contents={item.contents}
                  writer={item.writer}
                  commentMentions={item.commentMentions}
                  postId={postId}
                  writeTime={item.writeTime}
                  renewCommentList={RenewCommentList}
                  commentList={commentList}
                  childCommentCount={item.childCommentCount}
                  type="child"
                />)) :
              <></>}
            <Grid display={remainCount !== 0 ? 'block' : 'none'} className={classes.children}>
              <span
                display={remainCount !== 0 ? 'block' : 'none'}
                role="button"
                size="small"
                style={{ fontSize: 13, cursor: 'pointer' }}
                onClick={loadMoreCommentList}
              >
                ━━ 답글 {remainCount}개 보기
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Box >
      <Box display={visibility.form}>
        <CommentForm
          id={id}
          projectId={projectId}
          postId={postId}
          renewCommentList={RenewCommentList}
          contents={contents}
          forUpdate={forUpdate}
          setForUpdate={setForUpdate}
          parentWriterId={writer.id}
        />
      </Box>
    </>
  );
};

export default Comment;
