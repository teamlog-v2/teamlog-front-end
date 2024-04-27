import SettingsIcon from '@mui/icons-material/Settings';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Popover,
  Tab,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AuthContext, { setAccessToken } from '../contexts/auth';
import ProjectListContainer from '../project/ProjectListContainer';
import AccountList from './AccountList';
import {
  deleteAccount,
  follow,
  getAccount,
  getAccountFollower,
  getAccountFollowing,
  unfollow,
} from './AccountService';

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
  console.log(match)

  const history = useHistory();
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState('1');
  const [isLogin, setIsLogin] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [setContextId] = useContext(AuthContext);

  const [account, setAccount] = useState({
    isMe: false,
    isFollow: false,
    identification: '',
    name: '',
    profileImgPath: '',
    introduction: '',
  });

  useEffect(() => {
    (async () => {
      setIsLoaded(false);
      setValue('1');

      const response = await getAccount(match.params.accountId);

      if (response.status === 401) {
        setIsLogin(false);
        return;
      }

      const accountInfo = await response.json();

      setAccount(accountInfo);
      setIsLoaded(true);
    })();
  }, [match.params.accountId]);

  const handleSubmit = async () => {
    const response = await deleteAccount();
    if (response.status === 200) {
      localStorage.removeItem('access-token');
      setAccessToken(null);
      setContextId(null);
      history.push('/');
    } else {
      alert('회원 탈퇴에 실패했습니다.');
    }

    setAlertOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const followAccount = () => {
    const newAccount = { ...account, isFollow: true };
    
    follow(account.identification);
    setAccount(newAccount);
  };

  const unfollowAccount = () => {
    const newAccount = { ...account, isFollow: false };
    try {
      unfollow(account.identification);
    } catch (error) {
      console.log(error);
    }
    setAccount(newAccount);
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
          {account.isMe === null ? null : (
            <>
              {account.isMe ? (
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
              sx={{
                width: (theme) => theme.spacing(15),
                height: (theme) => theme.spacing(15),
              }}
              src={
                account.profileImgPath
              }
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography component="h1" variant="h5">
              {account.name}
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
              {account.introduction}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            {account.isMe === null ? null : (
              <>
                {account.isMe ? (
                  <Button
                    variant="outlined"
                    onClick={() => history.push(`/accounts/${match.params.accountId}/edit`)}
                  >
                    프로필 편집
                  </Button>
                ) : (
                  <>
                    {account.isFollow === true ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={unfollowAccount}
                      >
                        팔로잉
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={followAccount}
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
              <Tab label="팔로워" value="3" />
              <Tab label="팔로잉" value="4" />
            </TabList>
          </AppBar>
          <TabPanel value="1" disableGutters className={classes.tab}>
            <ProjectListContainer accountId={account.identification} />
          </TabPanel>
          <TabPanel disableGutters value="3">
            <AccountList
              type="FOLLOWER"
              accountId={account.identification}
              fetchData={getAccountFollower}
            />
          </TabPanel>
          <TabPanel disableGutters value="4">
            <AccountList
              type="FOLLOWING"
              accountId={account.identification}
              fetchData={getAccountFollowing}
            />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default MyPage;
