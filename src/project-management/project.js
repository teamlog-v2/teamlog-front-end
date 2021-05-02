import React, { useEffect, useState } from 'react';
import { Typography, Box, Divider, Grid,
  FormControl, NativeSelect, makeStyles, CircularProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Fab from '@material-ui/core/Fab';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Container from '@material-ui/core/Container';
import Header from './header';
import Introduction from './introduction';
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
  /* *** */
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

const projectId = 9;

const Project = () => {
  const classes = useStyles();

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
      if (res.length === 0) return;
      if (!res) {
        console.log('데이터 없음');
        return;
      }
      setPosts(res);
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

    // '스토리보드' 포함된 게시물 get [홈]
    // setSelectedTags([0]);
    // fetchPosts({ selected: [0] }, () => {
    //   setIsLoaded(true);
    // });

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
  }, []);

  return !isLoaded
  ? (
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <CircularProgress />
    </Grid>
  )
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
          <Title title="스토리보드" />
          <Typography>
            {
              posts.length === 0
                ? '검색된 게시물이 없습니다'
                : `총 ${posts.length}개의 게시물을 찾았습니다`
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
