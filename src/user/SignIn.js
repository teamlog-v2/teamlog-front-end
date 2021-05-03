import {
  Container,
  Button,
  Box,
  Grid,
  Avatar,
  TextField,
  Link,
} from '@material-ui/core';
import React, { useState } from 'react';
import FaceIcon from '@material-ui/icons/Face';

const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id,
      password,
    };
    console.log(data);
  };

  return (
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Box>
          <Box paddingBottom="12px">
            <Link href="/signUp">
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
  );
};

export default SignIn;
