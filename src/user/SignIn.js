import {
  Container,
  Button,
  Box,
  Grid,
  Avatar,
  Backdrop,
  CircularProgress,
  TextField,
  makeStyles,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import { login, validateLogin } from './userService';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const data = {
      id,
      password,
    };
    try {
      const response = await login(data);
      setIsProcessing(false);
      if (response.status === 200) {
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
    }
    setIsProcessing(false);
    setIsLogin(false);
  };

  useEffect(async () => {
    try {
      const response = await validateLogin();
      if (response.status === 200) {
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoaded(true);
  }, []);

  if (isLogin) {
    return <Redirect to="/" />;
  }

  if (!isLoaded) {
    return <div />;
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isProcessing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  variant="outlined"
                  fullWidth
                  id="id"
                  label="아이디"
                  autoFocus
                  onChange={handleIdChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Box paddingTop="12px" paddingBottom="12px">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                로그인
              </Button>
            </Box>
            <Box paddingBottom="12px">
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button fullWidth variant="outlined" color="primary">
                  회원가입
                </Button>
              </Link>
            </Box>
            <Box display="flex" paddingBottom="15px" justifyContent="flex-end">
              {/* <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.log('클릭');
              }}
            >
              로그인은 나중에 할래요...
            </Link> */}
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
