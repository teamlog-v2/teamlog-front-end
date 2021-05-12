import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  CircularProgress,
  FormControl,
  NativeSelect,
 Fab,
} from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { Edit } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import Postlist from '../post-management/postlist';
import HashtagChooser from '../organisms/HashtagChooser';
import useFetchPosts from '../hooks/useFetchPosts';
import { useFetchData } from '../hooks/hooks';

const useStyles = makeStyles((theme) => ({
  /* 반응형 스타일 */
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '2% 0',
    },
    [theme.breakpoints.up('md')]: {
      margin: '1% 0',
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  button: {
    position: 'fixed',
    zIndex: 999,
    [theme.breakpoints.down('sm')]: {
      left: '90%',
      top: '90%',
    },
    [theme.breakpoints.up('md')]: {
      left: '80%',
      top: '90%',
    },
  },
}));

const PostMain = () => {
  const classes = useStyles();
  const projectId = useParams().id;

  const [hashtags, isHashtagsLoaded] = useFetchData(
    `/api/projects/${projectId}/hashtags`,
  );

  // posts를 선별 조회하기 위한 states
  const [selectedTags, setSelectedTags] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState(1);

  // fetch를 위한 url을 해시태그와 키워드 검색을 토대로 생성한다.
  let url = `/api/posts/project/${projectId}?`;
  if (selectedTags.length !== 0) {
    url += `&hashtag=${selectedTags.map((index) => hashtags[index])}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  url += `&order=${order}`;

  // posts fetch를 이 hook에서 처리한다.
  const {
    posts,
    isLoading: isPostsLoading,
    fetchPosts,
    totalCount: postsTotalCount,
  } = useFetchPosts(url);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY < 0) {
        return;
      }
      if (isPostsLoading) {
        return;
      }

      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을 때
      if (scrollHeight - innerHeight - scrollTop < 100) {
        fetchPosts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPostsLoading, fetchPosts]);

  return (
    <>
      {/* <CssBaseline /> */}
      {!isHashtagsLoaded ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Container maxWidth="md">
            <Grid
              container
              md={10}
              justify="center"
              direction="column"
              style={{ margin: '0 auto' }}
            >
              <Grid
                className={classes.children}
                item
                container
                direction="row-reverse"
              >
                <TextField
                  placeholder="검색어를 입력하세요."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                />
              </Grid>
              <Grid className={classes.children} item container direction="row">
                <HashtagChooser
                  hashtags={hashtags}
                  selectedTags={selectedTags}
                  updateSelectedTags={(selected) => {
                    setSelectedTags(selected);
                  }}
                />
              </Grid>
              <Grid
                className={classes.children}
                container
                item
                justify="flex-end"
                xs={12}
              >
                <FormControl>
                  <NativeSelect
                    xs={7}
                    onChange={(event) => {
                      setOrder(event.target.value);
                    }}
                    name="filter"
                    inputProps={{ 'aria-label': 'age' }}
                  >
                    <option value="1">최신 순</option>
                    <option value="-1">오래된 순</option>
                    <option value="like">좋아요 순(미구현)</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid className={classes.children} item>
                <Typography>
                  {posts.length === 0 &&
                    !isPostsLoading &&
                    '검색된 게시물이 없습니다'}
                  {posts.length !== 0 &&
                    `총 ${postsTotalCount}개의 검색된 게시물 중 ${posts.length}개`}
                </Typography>

                <Postlist posts={posts} />
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ height: '20vh' }}
                >
                  {isPostsLoading && <CircularProgress />}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Link to={`/projects/${projectId}/new`}>
        <Fab className={classes.button} color="primary">
          <Edit />
        </Fab>
      </Link>
    </>
  );
};

export default PostMain;
