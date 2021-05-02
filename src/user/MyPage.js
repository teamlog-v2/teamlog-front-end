import {
  Grid,
  Avatar,
  Typography,
  Container,
  makeStyles,
  Divider,
  AppBar,
  Tab,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import ProjectListContainer from '../project/ProjectListContainer';
import { getUser } from './userService';

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
}));

const MyPage = () => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState('1');
  const [user, setUser] = useState({
    id: '',
    name: '',
    profileImgPath: '',
    introduction: '',
  });

  useEffect(() => {
    (async () => {
      let userInfo;
      try {
        const response = await getUser('string');
        userInfo = await response.json();
      } catch (err) {
        alert(err);
        setIsLoaded(false);
      }
      setUser(userInfo);
      console.log(userInfo);
      setIsLoaded(true);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container component="main" maxWidth="md">
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
            {user.introduction}
          </Typography>
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
          </TabList>
        </AppBar>
        <TabPanel value="1" className={classes.tab}>
          {isLoaded ? <ProjectListContainer userId={user.id} /> : null}
        </TabPanel>
        <TabPanel value="2">없음</TabPanel>
      </TabContext>
    </Container>
  );
};

export default MyPage;
