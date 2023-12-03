import { Edit, Map } from '@mui/icons-material';
import Search from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Fab,
  Grid,
  InputBase,
  NativeSelect,
  Typography
} from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { useFetchData } from '../hooks/hooks';
import useFetchPosts from '../hooks/useFetchPosts';
import HashtagChooser from '../organisms/HashtagChooser';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import PostFormPage from '../pages/PostFormPage';
import Postlist from '../post-management/postlist';

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
      margin: '1.5% 0',
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
    position: 'fixed',
    zIndex: 3,
    [theme.breakpoints.up('xs')]: {
      right: 0,
      bottom: 0,
      margin: '2%',
    },
    [theme.breakpoints.up('md')]: {
      left: '75%',
      top: '85%',
    },
  },
}));

let resource = 1;

const PostMain = (props) => {
  const classes = useStyles();
  const projectId = useParams().id;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const [userId] = useContext(AuthContext);

  const { relation } = props;

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
    updatePost,
    fetchPosts,
    totalCount: postsTotalCount,
    initPosts,
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

  useEffect(async () => {
    if (!formData || resource < 1) return;

    setIsPostLoading(true);

    window.scrollTo({ top: 200, behavior: 'smooth' });
    try {
      resource -= 1;
      setOpen(false);

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
        headers: {},
      });

      if (res.status === 201) {
        console.log('성공적으로 등록');
        setIsPostLoading(false);
        setFormData(null);
        initPosts();
      }
    } catch (error) {
      console.log(error);
    }
    resource += 1;
  }, [formData]);

  return (
    <>
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
              style={{ margin: '2% auto' }}
            >
              <Grid
                className={classes.children}
                item
                container
                justify="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <Search />
                  <InputBase
                    placeholder="검색어를 입력하세요."
                    onChange={(event) => {
                      setKeyword(event.target.value);
                    }}
                  />
                </Box>
                <Button
                  color="primary"
                  onClick={() => {
                    history.push(`/projects/${projectId}/map`);
                  }}
                >
                  <Map />
                  &nbsp;지도로 탐색하기
                </Button>
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
                <NativeSelect
                  native
                  onChange={(event) => {
                    setOrder(event.target.value);
                  }}
                  name="filter"
                  style={{ height: 30, width: 120 }} s
                >
                  <option value="1">최신 순</option>
                  <option value="-1">오래된 순</option>
                </NativeSelect>
              </Grid>
              <Grid className={classes.children} item>
                <Typography>
                  {posts.length === 0 &&
                    !isPostsLoading &&
                    keyword !== '' &&
                    '검색된 게시물이 없습니다'}
                  {posts.length !== 0 &&
                    `총 ${postsTotalCount}개의 검색된 게시물 중 ${posts.length}개`}
                </Typography>
                {isPostLoading ? (
                  <Card className={classes.children} elevation={0} xs={12}>
                    <Grid
                      item
                      container
                      alignItems="center"
                      style={{ border: '1px solid #eee', padding: '1%' }}
                    >
                      <CircularProgress />
                      &nbsp;업로드 중
                    </Grid>
                  </Card>
                ) : null}
                {posts.length === 0 && keyword === '' && !isPostsLoading ? (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ height: '50vh', fontWeight: 600 }}
                  >
                    아직 등록된 글이 없어요. 😢
                  </Grid>
                ) : (
                  <Postlist
                    posts={posts}
                    hashtags={hashtags}
                    setIsPostLoading={setIsPostLoading}
                    setFormData={setFormData}
                    initPosts={initPosts}
                    updatePost={updatePost}
                    relation={relation}
                  />
                )}
                {(relation === 'MEMBER' || relation === 'MASTER') && (
                  <Fab
                    className={classes.button}
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </Fab>
                )}
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
      <ResponsiveDialog open={open} updateOpen={setOpen}>
        <PostFormPage
          hashtags={hashtags}
          updateOpen={setOpen}
          updateFormData={setFormData}
        />
      </ResponsiveDialog>
    </>
  );
};

export default PostMain;
