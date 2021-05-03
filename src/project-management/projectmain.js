import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Grid,
  FormControl,
  NativeSelect,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Header from './header';
import Introduction from './introduction';
import Postlist from '../post-management/postlist';
import HashtagChooser from '../organisms/HashtagChooser';
import { Route } from 'react-router';
import MyPage from '../user/MyPage';

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
  subtitle: {
    // 글씨 크기 등 적용할 예정
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

const ProjectMain = ({ match }) => {
  const classes = useStyles();
  const projectId = match.params.id;

  const [project, setProject] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // 프로젝트 전체에 대한 로드 상태
  const [isPostsLoaded, setIsPostsLoaded] = useState(false); // 게시글에 대한 로드 상태

  const fetchPosts = async (callback) => {
    setIsPostsLoaded(false);

    let url = `/api/posts/project/${projectId}`;
    const names = ['스토리보드'];
    url += `/hashtag/${names}`;

    await fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length >= 0) {
          setPosts(res);
        }
        setIsPostsLoaded(true);
        if (callback) callback(res); // 포스트 결과를 한 번 더 활용해야하는 경우 매개변수로 전달
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProject = () => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((info) => setProject(info));
  };

  useEffect(async () => {
    // '스토리보드' 포함된 게시물 get [홈]
    fetchProject();
    fetchPosts(() => {
      setIsLoaded(true);
    });
  }, []);

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
      <CssBaseline />

      <Container maxWidth="md">
        <Container className={classes.partition} disableGutters>
          <Title title={project.name} />
          <Introduction
            name={project.name}
            masterUserId={project.masterId}
            createTime={project.createTime}
            followerCount={project.followerCount}
            memberCount={project.memberCount}
          />
        </Container>
        <Container className={classes.partition} disableGutters>
          <Title title="스토리보드" />
          {isPostsLoaded ? (
            <Postlist posts={posts} />
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: '50vh' }}
            >
              <CircularProgress />
            </Grid>
          )}
        </Container>
      </Container>
    </>
  );
};

export default ProjectMain;
