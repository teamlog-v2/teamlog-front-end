import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  NativeSelect,
  makeStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import HashtagChooser from '../organisms/HashtagChooser';
import postsMock from '../mock/posts';

const useStyles = makeStyles((theme) => ({
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

const mainHashtag = '스토리보드';

const ProjectPage = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projectHashtags, setProjectHashtags] = useState([`${mainHashtag}`]);
  const [selectedTags, setSelectedTags] = useState([0]);

  const handleInputChange = (event) => {
    const { value } = event.target;

    // 전체 포스트 대상으로 검색
    // @get fetch('/post?, { method: 'GET', })
    // get에서 분기 ? or url다른 get 여러 개?
    const newPosts = postsMock.filter(({ content }) => content.includes(value));
    setPosts(newPosts);
    setSelectedTags([]);

    const tags = document.querySelectorAll('.tags');
    tags.forEach((tag) => {
      tag.style.backgroundColor = 'white';
      tag.style.color = '#C16AF5';
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

  const fetchPosts = (selected) => {
    let newPosts;
    if (selected.length === 0) { // 아무것도 해시태그가 선택되지 않으면
      newPosts = [...postsMock]; // 전체가 저장됨.
    } else {
      newPosts = postsMock.filter(({ tag_list }) => (
        selected.some((selectedIndex) => (
          tag_list.some(({ name }) => name === projectHashtags[selectedIndex])
      ))));
    }
    // 실제 request api 요청
    // fetch('SERVER_ADDRESS', { method: 'GET', body: hashtags })
    // return [] // 해시태그를 포함하는 포스트들
    setPosts(newPosts);
  };

  useEffect(() => { // 특정 프로젝트에 대해 모든 해시태그 값들 get // @get('/post_hashtags/projectId')
    const initProjectHashtags = [];

    postsMock.forEach(({ tag_list }) => { // 중복된 해시태그 거르고 해시태그 추출
      tag_list.forEach(({ name }) => {
        if (!initProjectHashtags.includes(name)) {
          initProjectHashtags.push(name);
        }
      });
    });
    setIsLoaded(true);
    fetchPosts([0]); // 스토리보드
    setProjectHashtags(initProjectHashtags); // 똑같은 state라 하더라도 set을 하면
                                            // rerendring, effect가 반복해서 수행됨.
  }, []);

  return !isLoaded
    ? <div>loading...</div>
    : (
      <Grid className={classes.root} container alignItems="center">
        <Grid className={classes.children} item container justify="flex-end">
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
              fetchPosts(selected);
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
        <Grid className={classes.children} item container xs={12}>
          {
            posts.map(({ id, contents, post_liker_count, comment_count, write_time }) => (
              <Paper
                className={classes.children}
                elevation={0}
                variant="outlined"
                style={{ padding: '1%' }}
              >
                <Grid key={id}>
                  {contents}
                </Grid>
                <Grid style={{ backgroundColor: 'white' }}>
                  ❤{post_liker_count} 🗨{comment_count} 🕓{write_time}
                </Grid>
              </Paper>
              ))
          }
        </Grid>
      </Grid>
  );
};

export default ProjectPage;
