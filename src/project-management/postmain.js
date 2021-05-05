import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { useParams } from 'react-router-dom';
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
  partition: {
    marginTop: '2.5em',
    marginBottom: '2.5em',
  },
}));

// posts order 로직 코드는 백엔드 api 결합이 불가능해보여서 제거함. 추후 다시 생성 요망.
// 새로 필요한 api
// 1. 프로젝트의 모든 해시태그를 가져오는 api
// 2. posts 페이지네이션 api
// 3. posts 정렬 api
//
const ProjectMain = () => {
  const classes = useStyles();
  const projectId = useParams().id;

  // 프로젝트의 해시태그들을 가져오기 위한 임시 처리, 백엔드 api 추가 시 대응 수정할 것
  const [tempPosts, isHashtagsLoaded] = useFetchData(
    `/api/posts/project/${projectId}`,
  );
  const hashtags = [];
  (tempPosts || []).forEach((post) => {
    // 중복된 해시태그 거르고 해시태그 추출
    post.hashtags.forEach((name) => {
      if (!hashtags.includes(name)) {
        hashtags.push(name);
      }
    });
  });

  // posts를 선별 조회하기 위한 states
  const [selectedTags, setSelectedTags] = useState([]);
  const [keyword, setKeyword] = useState('');

  // fetch를 위한 url을 해시태그와 키워드 검색을 토대로 생성한다.
  let url = `/api/posts/project/${projectId}`;
  if (selectedTags.length !== 0) {
    url += `/hashtag/${selectedTags.map((index) => hashtags[index])}`;
  } else if (keyword) {
    url += `/${keyword}`;
  }

  // posts fetch를 이 hook에서 처리한다.
  const { posts, isLoading: isPostsLoading, fetchPosts } = useFetchPosts(url);

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
      const scrollTop = window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
      // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을 때
      if (scrollHeight - innerHeight - scrollTop < 100) {
        fetchPosts();
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isPostsLoading, fetchPosts]);

  return !isHashtagsLoaded ? (
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
      <CssBaseline />

      <Container maxWidth="md">
        <Grid className={classes.children} container direction="row-reverse">
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
        <Grid
          className={classes.children}
          item
          container
          direction="row"
          xs={12}
        >
          <HashtagChooser
            hashtags={hashtags}
            selectedTags={selectedTags}
            updateSelectedTags={(selected) => {
              setSelectedTags(selected);
            }}
          />
        </Grid>
        <Container className={classes.partition} disableGutters>
          <Typography>
            {posts.length === 0 // 서버 대응 수정이 필요함
              ? '검색된 게시물이 없습니다'
              : `총 ?개의 검색된 게시물 중 ${posts.length}개`}
          </Typography>

          <Postlist posts={posts} />
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: '20vh' }}
          >
            {isPostsLoading && (
              <CircularProgress />
            )}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default ProjectMain;
