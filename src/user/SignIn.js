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
  Divider,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import { login, validateLogin } from './userService';
import AuthContext, { setAccessToken } from '../contexts/auth';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const history = useHistory();
  const [contextId, setContextId, _, setContextProfileImgPath] = useContext(AuthContext);

  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleIdChange = (event) => {
    setIdentification(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    const data = {
      identification,
      password,
    };

    let res;
    try {
      res = await login(data);
      res = await res.json();
    } catch {
      if (isMounted.current) {
        setIsProcessing(false);
      }
      return;
    }
    if (!isMounted.current) {
      return;
    }
    if (res.message) {
      setIsProcessing(false);
      return;
    }

    localStorage.setItem('access-token', res.token);
    setAccessToken(res.token);
    res = await validateLogin();
    res = await res.json();
    console.log(res);
    if (!isMounted.current) {
      return;
    }
    if (res.status) {
      setIsProcessing(false);
      return;
    }
    setContextId(res.id);
    setContextProfileImgPath(res.profileImgPath);
    setIsProcessing(false);
    history.push('/main');
  };

  if (contextId) {
    history.push('/main');
    return null;
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
          TeamLog
        </Typography>
        <Box height="1rem" />
        <Divider />
        <Box height="1rem" />
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="identification"
                  variant="outlined"
                  fullWidth
                  id="identification"
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
