import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Backdrop,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Avatar,
  Box,
  makeStyles,
  Divider,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import { createUser, validateLogin } from './userService';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const data = {
      id,
      password,
      name,
    };
    try {
      console.log(data);
      const response = await createUser(data);
      setIsProcessing(false);
      if (response.status === 201) {
        setIsSuccess(true);
        alert('회원가입을 축하합니다 ^^');
      }
    } catch (err) {
      console.error('Error');
      setIsProcessing(false);
    }
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
    return <Redirect to="/main" />;
  }

  if (isSuccess) {
    return <Redirect to="/login" />;
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
        <Box height="5rem" />
        <Divider />
        <Box height="1rem" />
        <Typography variant="h4" align="center">
          회원가입
        </Typography>
        <Box height="1rem" />
        <Divider />
        <Box height="1rem" />
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="id"
                  variant="outlined"
                  required
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
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  onChange={handleNameChange}
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
                가입하기
              </Button>
            </Box>
            <Box display="flex" paddingBottom="15px" justifyContent="flex-end">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body1" color="textSecondary">
                  이미 계정이 있으신가요? 로그인 하기
                </Typography>
              </Link>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
