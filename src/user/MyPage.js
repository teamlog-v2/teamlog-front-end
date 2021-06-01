import {
  Grid,
  Avatar,
  Box,
  List,
  ListItem,
  DialogContent,
  Dialog,
  DialogContentText,
  Popover,
  IconButton,
  Typography,
  Container,
  makeStyles,
  Button,
  Divider,
  AppBar,
  Tab,
} from '@material-ui/core';
import { AlertTitle, TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AuthContext, { setAccessToken } from '../contexts/auth';
import { unsubscribe } from '../pusherUtils';
import BeamsClientContext from '../contexts/beamsClient';
import ProjectListContainer from '../project/ProjectListContainer';
import TeamList from '../team/TeamList';
import UserList from './UserList';
import {
  getUser,
  deleteUser,
  getUserFollower,
  getUserFollowing,
  follow,
  unfollow,
} from './userService';
import { convertResourceUrl } from '../utils';

const useStyles = makeStyles((theme) => ({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [id, setContextId, profileImgPath] = useContext(AuthContext);
  const [client, setClient] = useContext(BeamsClientContext);

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

  const handleSubmit = async () => {
    try {
      const response = await deleteUser();
      if (response.status === 200) {
        localStorage.removeItem('access-token');
        unsubscribe(client);
        setAccessToken('');
        setContextId(null);
        history.push('/');
      } else if (response.status === 400) {
        const res = await response.json();
        alert(res.message);
      }
    } catch (err) {
      setAlertOpen(false);
      alert(err);
    }
    setAlertOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  if (!isLoaded) {
    return <div />;
  }

  const open = Boolean(anchorEl);
  const anchorId = open ? 'simple-popover' : undefined;

  return (
    <>
      <Dialog
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ width: 230, textAlign: 'start' }}>
          <DialogContentText id="alert-dialog-description">
            모든 팀과 프로젝트를 탈퇴한 상태에서 가능합니다.
            <br />
            회원 탈퇴 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <Grid container direction="row" justify="space-evenly">
          <Button onClick={handleSubmit} color="primary" autoFocus>
            확인
          </Button>
          <Button
            onClick={() => {
              setAlertOpen(false);
            }}
          >
            취소
          </Button>
        </Grid>
      </Dialog>
      <Popover
        id={anchorId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          <ListItem button onClick={() => setAlertOpen(true)}>
            회원삭제
          </ListItem>
        </List>
      </Popover>
      <Container
        component="main"
        disableGutters
        maxWidth="md"
        style={{ marginTop: '0.5rem' }}
      >
        <Box
          zIndex={1}
          align="right"
          padding="0.8rem 0.8rem"
          style={{ opacity: 0.9 }}
        >
          {user.isMe === null ? null : (
            <>
              {user.isMe ? (
                <IconButton variant="contained" onClick={handleClick}>
                  <SettingsIcon />
                </IconButton>
              ) : null}
            </>
          )}
        </Box>
        <Grid container style={{ gap: 15 }}>
          <Grid item xs={12} align="center">
            <Avatar
              className={classes.large}
              src={
                user.profileImgPath
                  ? convertResourceUrl(user.profileImgPath)
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography component="h1" variant="h5">
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography
              color="textSecondary"
              style={{
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.introduction}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            {user.isMe === null ? null : (
              <>
                {user.isMe ? (
                  <Button
                    variant="outlined"
                    onClick={() => history.push(`/users/${match.params.userId}/edit`)}
                  >
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
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
        <TabContext value={value}>
          <AppBar position="static" elevation={0} color="transparent">
            <TabList onChange={handleChange} centered>
              <Tab label="프로젝트" value="1" />
              <Tab label="팀" value="2" />
              <Tab label="팔로워" value="3" />
              <Tab label="팔로잉" value="4" />
            </TabList>
          </AppBar>
          <TabPanel value="1" disableGutters className={classes.tab}>
            <ProjectListContainer userId={user.id} />
          </TabPanel>
          <TabPanel value="2" disableGutters>
            <TeamList />
          </TabPanel>
          <TabPanel disableGutters value="3">
            <UserList
              type="FOLLOWER"
              userId={user.id}
              fetchData={getUserFollower}
            />
          </TabPanel>
          <TabPanel disableGutters value="4">
            <UserList
              type="FOLLOWING"
              userId={user.id}
              fetchData={getUserFollowing}
            />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default MyPage;
