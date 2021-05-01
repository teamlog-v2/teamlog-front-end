import React, { useEffect, useState } from 'react';
import { Typography, Box, Divider, Grid,
  FormControl, NativeSelect, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Container from '@material-ui/core/Container';
import Header from './header';
import Introduction from './introduction';
import Postlist from '../post-management/postlist';
import HashtagChooser from '../organisms/HashtagChooser';
import postsMock from '../mock/posts';

const useStyles = makeStyles((theme) => ({
  // arrowButton: {
  //     zIndex: 'tooltip'
  // },
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

const sections = [
  { title: '홈', url: '#' },
  { title: '포스트', url: '/post' },
  { title: '태스크', url: '/task' },
  { title: '멤버', url: 'member' },
  { title: '팔로워', url: 'follower' },
];

const Project = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projectHashtags, setProjectHashtags] = useState(['스토리보드']);
  const [selectedTags, setSelectedTags] = useState([0]);

  const handleInputChange = (event) => {
    const { value } = event.target;

    // 전체 포스트 대상으로 검색
    // @get fetch('/post?, { method: 'GET', })
    // get에서 분기 ? or url다른 get 여러 개?
    const newPosts = postsMock.filter(({ contents }) => contents.includes(value));
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
        if (a.write_time < b.write_time) return 1;
        if (a.write_time > b.write_time) return -1;
        return 0;
      });
    } else if (value === 'like') {
      newPosts.sort((a, b) => {
        if (a.like_count < b.like_count) return 1;
        if (a.like_count > b.like_count) return -1;
        return 0;
      });
    } else if (value === 'comment') {
      newPosts.sort((a, b) => {
        if (a.commen_count < b.comment_count) return 1;
        if (a.comment_count > b.comment_count) return -1;
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
    fetchPosts([0]); // 스토리보드
    setProjectHashtags(initProjectHashtags); // 똑같은 state라 하더라도 set을 하면
                                            // rerendring, effect가 반복해서 수행됨.
    setIsLoaded(true);
  }, []);

  return !isLoaded
  ? <div>loading...</div>
  : (
    <>
      <CssBaseline />

      <Header
        title="도쿄 여행 프로젝트"
        introduction="동창 친구 넷이서 떠나는 도쿄 여행"
        sections={sections}
        handleInputChange={handleInputChange}
      />

      <Container maxWidth="md">
        <Container className={classes.partition} disableGutters>
          <Title title="도쿄 여행 프로젝트 소개" />
          <Introduction
            name="도쿄 여행 프로젝트"
            master_user_id="jduck1024"
            create_time="2021년 04월 17일"
            follower_count={15}
            member_count={60}
          />
        </Container>
        <Divider light style={{ margin: '1% 0' }} />
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
        <Container className={classes.partition} disableGutters>
          <Title title="스토리보드" />
          <Postlist posts={posts} />
        </Container>
      </Container>
    </>
  );
};

// const UpwardButton = () => {
//   const classes = useStyles();
//   return (
//     <Box className={classes.arrowButton}>
//       <Fab color="primary" aria-label="add">
//         <ArrowUpwardIcon />
//       </Fab>
//     </Box>
//   );
// };

const Title = (props) => {
  const { title } = props;

  return (
    <Box margin="0.5em">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default Project;
