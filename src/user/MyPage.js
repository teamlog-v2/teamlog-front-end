import {
  Grid,
  Avatar,
  Typography,
  Container,
  makeStyles,
  Button,
  Divider,
  AppBar,
  Tab,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ProjectListContainer from '../project/ProjectListContainer';
import UserList from './UserList';
import {
  logout,
  getUser,
  getUserFollower,
  getUserFollowing,
  follow,
  unfollow,
} from './userService';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  tab: {
    '& .MuiTabPanel-root': {
      padding: '0px',
    },
  },
  input: {
    display: 'none',
  },
  scrollPaper: {
    alignItems: 'baseline',
  },
  bold: {
    background: 'black',
  },
}));

const MyPage = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState('1');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    isMe: false,
    isFollow: false,
    id: '',
    name: '',
    profileImgPath: '',
    introduction: '',
  });

  useEffect(() => {
    (async () => {
      setIsLoaded(false);
      setValue('1');
      let userInfo;
      try {
        const response = await getUser(match.params.userId);
        if (response.status === 401) {
          setIsLogin(false);
        }
        userInfo = await response.json();
      } catch (err) {
        alert(err);
        setIsLoaded(false);
      }
      setUser(userInfo);
      console.log(userInfo);
      setIsLoaded(true);
    })();
  }, [match.params.userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const followUser = () => {
    const newUser = { ...user, isFollow: true };
    try {
      const response = follow(user.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setUser(newUser);
  };

  const unfollowUser = () => {
    const newUser = { ...user, isFollow: false };
    try {
      const response = unfollow(user.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setUser(newUser);
  };

  const handleLogout = async () => {
    await logout();
    setIsLogin(false);
  };

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  if (!isLoaded) {
    return <div />;
  }

  return (
    <>
      <Container component="main" disableGutters maxWidth="md">
        <Button variant="outlined" onClick={handleLogout}>
          로그아웃
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Avatar className={classes.large} src={user.profileImgPath} />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography component="h1" variant="h5">
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="body1" color="textSecondary">
              <pre style={{ fontFamily: 'inherit', margin: 0 }}>
                {user.introduction}
              </pre>
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            {user.isMe ? (
              <Button variant="outlined" onClick={() => history.push(`/users/${match.params.userId}/edit`)}>
                프로필 편집
              </Button>
            ) : (
              <>
                {user.isFollow === true ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={unfollowUser}
                  >
                    팔로잉
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={followUser}
                  >
                    팔로우
                  </Button>
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
        <TabContext value={value}>
          <AppBar position="static" elevation={0} color="transparent">
            <TabList onChange={handleChange}>
              <Tab label="프로젝트" value="1" />
              <Tab label="팀" value="2" />
              <Tab label="팔로워" value="3" />
              <Tab label="팔로잉" value="4" />
            </TabList>
          </AppBar>
          <TabPanel value="1" disableGutters className={classes.tab}>
            <ProjectListContainer userId={user.id} />
          </TabPanel>
          <TabPanel value="2" disableGutters>없음</TabPanel>
          <TabPanel disableGutters value="3">
            <UserList userId={user.id} fetchData={getUserFollower} />
          </TabPanel>
          <TabPanel disableGutters value="4">
            <UserList userId={user.id} fetchData={getUserFollowing} />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default MyPage;
