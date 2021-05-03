import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  FormControl,
  NativeSelect,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Postlist from '../post-management/postlist';
import HashtagChooser from '../organisms/HashtagChooser';

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

const ProjectMain = ({ match }) => {
  const classes = useStyles();
  const projectId = match.params.id;

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // 프로젝트 전체에 대한 로드 상태
  const [isPostsLoaded, setIsPostsLoaded] = useState(false); // 게시글에 대한 로드 상태
  const [projectHashtags, setProjectHashtags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchPosts = async ({ selected, keyword }, callback) => {
    setIsPostsLoaded(false);

    let url = `/api/posts/project/${projectId}`;

    if (selected && selected.length !== 0) {
      // ❇️ 해시태그 선별 조회 시 프로젝트 내 선별조회이므로 프로젝트 id도 api에 함께 전송
      const names = selected.map((index) => projectHashtags[index]);
      url += `/hashtag/${names}`;
    } else if (keyword) {
      url += `/${keyword}`;
    }

    await fetch(url, {
      method: 'GET',
    }).then((res) => res.json()).then((res) => {
      if (res.length >= 0) {
        setPosts(res);
      }
      setIsPostsLoaded(true);
      if (callback) callback(res); // 포스트 결과를 한 번 더 활용해야하는 경우 매개변수로 전달
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    fetchPosts({ keyword: value }, () => {
      setSelectedTags([]);
      // 해시태그 스타일 초기화
      const tags = document.querySelectorAll('.tags');
      tags.forEach((tag) => {
        tag.style.backgroundColor = 'white';
        tag.style.color = '#C16AF5';
      });
    });
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    const newPosts = [...posts];
    if (value === 'new') {
      newPosts.sort((a, b) => {
        if (a.writeTime < b.writeTime) return 1;
        if (a.writeTime > b.writeTime) return -1;
        return 0;
      });
    } else if (value === 'like') {
      newPosts.sort((a, b) => {
        if (a.likeCount < b.likeCount) return 1;
        if (a.likeCount > b.likeCount) return -1;
        return 0;
      });
    } else if (value === 'comment') {
      newPosts.sort((a, b) => {
        if (a.commentCount < b.commentCount) return 1;
        if (a.commentCount > b.commentCount) return -1;
        return 0;
      });
    }
    setPosts(newPosts);
  };

  useEffect(async () => {
    const initProjectHashtags = [];

    // 현재 프로젝트의 모든 해시태그 get => 모든 게시물 get [포스트]
    fetchPosts({}, (result) => {
      result.forEach(({ hashtags }) => { // 중복된 해시태그 거르고 해시태그 추출
        hashtags.forEach((name) => {
            if (!initProjectHashtags.includes(name)) {
              initProjectHashtags.push(name);
          }
        });
      });
      setProjectHashtags(initProjectHashtags);
      setIsLoaded(true);
     });
    setIsLoaded(true);
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
        <Grid className={classes.children} container direction="row-reverse">
          <TextField
            placeholder="검색어를 입력하세요."
            InputProps={{ endAdornment: (<InputAdornment><Search /></InputAdornment>) }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid className={classes.children} item container direction="row" xs={12}>
          <HashtagChooser
            hashtags={projectHashtags}
            selectedTags={selectedTags}
            updateSelectedTags={(selected) => {
              setSelectedTags(selected);
              fetchPosts({ selected });
          }}
          />
        </Grid>
        <Grid className={classes.children} container item justify="flex-end" xs={12}>
          <FormControl>
            <NativeSelect
              xs={7}
              onChange={handleSelectChange}
              name="filter"
              inputProps={{ 'aria-label': 'age' }}
            >
              <option value="new">최신 순</option>
              <option value="like">공감 순</option>
              <option value="comment">댓글 순</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Container className={classes.partition} disableGutters>
          <Typography>
            {
              posts.length === 0
                ? '검색된 게시물이 없습니다'
                : `총 ${posts.length}개의 게시물`
            }
          </Typography>
          {
            isPostsLoaded
              ? <Postlist posts={posts} />
              : (
                <Grid container justify="center" alignItems="center" style={{ height: '50vh' }}>
                  <CircularProgress />
                </Grid>
                )
          }
        </Container>
      </Container>
    </>
  );
};

export default ProjectMain;
