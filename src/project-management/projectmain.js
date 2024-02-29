import {
  Box,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
// import Fab from '@mui/material/Fab';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Container from '@mui/material/Container';
import { useParams } from 'react-router';
import { useFetchData } from '../hooks/hooks';
import useFetchPosts from '../hooks/useFetchPosts';
import Postlist from '../post/PostList';
import Introduction from './introduction';

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
}));

const Title = (props) => {
  const { title } = props;

  return (
    <Box margin="0.5em">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

const ProjectMain = (props) => {
  const classes = useStyles();
  const projectId = useParams().id;

  // const [project, setProject] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false); // 프로젝트 정보 대한 로드 상태
  const { relation } = props;

  let url = `/api/posts/project/${projectId}?`;
  const names = ['스토리보드'];
  url += `&hashtag=${names}`;

  const [data, isLoaded] = useFetchData(`/api/projects/${projectId}`);
  const project = data;

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

  return !isLoaded ? (
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
          style={{ margin: '0 auto' }}>
          <Container disableGutters style={{ paddingTop: '5%' }}>
            {/* <Title title={project.name} /> */}
            <Introduction
              {...project}
            />
          </Container>
          <Container disableGutters>
            {posts.length === 0 ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '50vh', fontWeight: 600 }}
              >
                아직 등록된 글이 없어요. 😢
              </Grid>
            ) : (
              <Postlist posts={posts} relation={relation} />
            )}
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: '20vh' }}
            >
              {isPostsLoading && <CircularProgress />}
            </Grid>
          </Container>
        </Grid>
      </Container>
    </>
  );
};

export default ProjectMain;
