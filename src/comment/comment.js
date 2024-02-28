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
import { AccountId, AccountImage } from '../post/AccountProfile';
import { DeleteComment, ReadChildCommentList } from './commentapi';
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
  accountInfo: {
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
    contents,
    childCommentCount,
    removeSelectedComment,
    updateCommentCount,
    setIsRefreshed
  } = props;

  const [accountId] = useContext(AuthContext);

  // 댓글 관련 필드
  const chunkSize = 5;
  const [page, setPage] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [remainCount, setRemainCount] = useState(childCommentCount);

  const classes = useStyles();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const addLatestComment = useCallback(async (comment) => {
    setCommentList([comment, ...commentList]);
  });

  const newRemoveSelectedComment = useCallback(async (removedCommentId) => {
    setCommentList(commentList.filter((comment) => comment.id !== removedCommentId));
  })

  const loadMoreCommentList = async () => {
    setIsRefreshed(false);
    if (remainCount === 0) {
      setIsRefreshed(true);
      return;
    }

    const response = await ReadChildCommentList(id, page, chunkSize);
    setCommentList([...commentList, ...response.content])

    if (response.last) {
      setRemainCount(0);
    } else {
      setRemainCount(remainCount - chunkSize);
      setPage(page + 1);
    }

    setIsRefreshed(true);
  }

  return (
    <>
      <Box>
        <Grid container xs={12} className={classes.children}>
          <Grid item>
            <AccountImage imgPath={writer.profileImgPath} />
          </Grid>
          <Grid className={classes.commentGrid}>
            <Content
              writer={(<AccountId accountId={writer.id} />)}
              writeTime={<DateInfo dateTime={writeTime} />}
              funcs={(<>
                {accountId && (<span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsFormVisible(!isFormVisible);
                  }}
                >
                  답글달기&nbsp;
                </span>)}
                {
                  writer.id === accountId && (<>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={async () => {
                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                          setIsRefreshed(false);
                          const status = await DeleteComment(id);
                          if (status === 200) {
                            removeSelectedComment(id);
                            updateCommentCount(-1);
                          }
                          setIsRefreshed(true);
                        }
                      }}
                    >
                      삭제하기&nbsp;
                    </span>
                  </>)
                }
              </>)
              }
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
                  childCommentCount={item.childCommentCount}
                  removeSelectedComment={newRemoveSelectedComment}
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
      <Box display={isFormVisible ? 'block' : 'none'}>
        <CommentForm
          parentCommentId={id}
          projectId={projectId}
          postId={postId}
          contents={contents}
          parentWriterId={writer.id}
          addLatestComment={addLatestComment}
          updateCommentCount={updateCommentCount}
          setIsRefreshed={setIsRefreshed}
        />
      </Box>
    </>
  );
};

export default Comment;
