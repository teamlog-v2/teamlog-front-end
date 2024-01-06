import { Skeleton } from '@mui/lab';
import { Box, Grid, LinearProgress } from '@mui/material';
import {
  useCallback,
  useEffect,
  useState
} from 'react';
import Comment from './comment';
import { GetComment } from './commentapi';
import CommentForm from './commentform';
// import ChildCommentList from './childcommentlist';

const CommentList = ({ setCommentCounter, projectId, postId, type }) => {
  const chunkSize = 5;

  const [commentList, setCommentList] = useState([]);
  const [moreVisibility, setMoreVisibility] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(true);

  const refreshCommentList = useCallback(async (counterEvent) => {
    setIsRefreshed(false);
    const response = await GetComment(postId, page, chunkSize);
    setCommentList([...commentList, ...response.content]);
    setCommentCounter(counterEvent);

    if (response.last) {
      setMoreVisibility('none');
    } else {
      setMoreVisibility('block');
    }
    setIsRefreshed(true);
  });

  useEffect(async () => {
    const response = await GetComment(postId, page, chunkSize);

    setCommentList([...commentList, ...response.content]);
    setIsLoaded(true);
    if (response.last) {
      setMoreVisibility('none');
    }
  }, [page]);

  return isLoaded ?
    (
      <>
        {isRefreshed ? (<></>) : (<LinearProgress />)}
        {
          commentList
            ? commentList.map((item) => (
              <Box key={item.id} padding='0 1.5%'>
                <Comment
                  id={item.id}
                  projectId={projectId}
                  contents={item.contents}
                  writer={item.writer}
                  commentMentions={item.commentMentions}
                  postId={postId}
                  writeTime={item.writeTime}
                  renewCommentList={refreshCommentList}
                  commentList={commentList}
                  childCommentCount={item.childCommentCount}
                  type="parent"
                />
              </Box>
            ))
            : []
        }
        <Box display={moreVisibility} style={{ padding: '15px 15px' }}>
          <span
            role="button"
            size="small"
            tabIndex={0}
            style={{ fontSize: 13, cursor: 'pointer' }}
            onClick={async () => {
              setPage(page + 1);
            }}
          >
            댓글 더 보기...
          </span>
        </Box>
        {type === 'compressed' ? (<></>) : (
          <CommentForm
            parentCommentId={null}
            projectId={projectId}
            postId={postId}
            renewCommentList={refreshCommentList}
          />
        )}
      </>
    ) : (
      <>
        <Grid container direction="row" xs={12} justify="space-between" style={{ margin: '0.5em' }}>
          <Grid item container direction="row" xs={12}>
            <Grid item>
              <Skeleton animation="wave" variant="circle" width={35} height={35} />
            </Grid>
            <Grid item container direction="column" xs={2} style={{ padding: '0 1%', marginBottom: '0.5em' }}>
              <Skeleton animation="wave" height={25} width="100%" style={{ marginBottom: 1 }} />
              <Skeleton animation="wave" height={12} width="80%" style={{ marginBottom: 1 }} />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginRight: '1em' }}>
            <Skeleton animation="wave" variant="rect" height={50} />
          </Grid>
        </Grid>
        <Grid container direction="row" xs={12} justify="space-between" style={{ margin: '0.5em' }}>
          <Grid item container direction="row" xs={12}>
            <Grid item>
              <Skeleton animation="wave" variant="circle" width={35} height={35} />
            </Grid>
            <Grid item container direction="column" xs={2} style={{ padding: '0 1%', marginBottom: '0.5em' }}>
              <Skeleton animation="wave" height={25} width="100%" style={{ marginBottom: 1 }} />
              <Skeleton animation="wave" height={12} width="80%" style={{ marginBottom: 1 }} />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginRight: '1em' }}>
            <Skeleton animation="wave" variant="rect" height={50} />
          </Grid>
        </Grid>
      </>
    );
};

export default CommentList;
