import { Box, Button, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';

let visited = false;

export default function Greeting() {
  const [id] = useContext(AuthContext);
  const [open, setOpen] = useState(!visited);

  if (!!id || !open) {
    return null;
  }

  return (
    <WrapperBox>
      <LoginForm setOpen={setOpen} />
    </WrapperBox>
  );
}

//
function LoginForm({ setOpen }) {
  const bottomGap = {
    style: {
      marginBottom: '1rem',
    },
  };

  return (
    <Box maxWidth="360px">
      <Box
        bgcolor="rgba(255, 255, 255, 0.75)"
        borderRadius="0.25rem"
        padding="2rem"
      >
        <Box display="flex" justifyContent="center" {...bottomGap}>
          <Intro />
        </Box>
        <Box
          bgcolor="rgba(255, 255, 255, 0.75)"
          padding="1.5rem 1rem"
          borderRadius="0.25rem"
          {...bottomGap}
        >
          <form
            onSubmit={() => {
              console.log('gogo');
            }}
          >
            <TextField
              {...bottomGap}
              size="small"
              autoFocus
              variant="outlined"
              label="아이디"
              fullWidth
            />
            <TextField
              {...bottomGap}
              size="small"
              variant="outlined"
              type="password"
              label="비밀번호"
              fullWidth
            />
            <Button
              color="primary"
              variant="contained"
              disableElevation
              fullWidth
            >
              로그인
            </Button>
          </form>
        </Box>
        <Box
          {...bottomGap}
          padding="0.5rem"
          borderRadius="0.25rem"
          border="1px solid rgba(0, 0, 0, 0.25)"
          textAlign="center"
        >
          처음이신가요? <CustomLink>회원가입</CustomLink>
        </Box>
        <Box textAlign="center">
          <CustomLink
            onClick={() => {
              visited = true;
              setOpen(false);
            }}
          >
            로그인하지 않고 이용하기
          </CustomLink>
        </Box>
      </Box>
    </Box>
  );
}

function Intro(props) {
  return (
    <Box fontSize="1.75rem" fontWeight="300" {...props}>
      TeamLog에서,
      <br />
      팀의 여정을 기록하세요.
    </Box>
  );
}

function WrapperBox({ children, ...props }) {
  return (
    <Box
      position="fixed"
      zIndex={99999}
      top={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(0, 0, 0, 0.25)"
      {...props}
    >
      {children}
    </Box>
  );
}

function CustomLink({ children, ...props }) {
  return (
    <Link style={{ color: '#593875', textDecoration: 'none' }} {...props}>
      {children}
    </Link>
  );
}
