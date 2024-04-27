import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as Anchor, Box, Button, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as fetchLogin, validateLogin } from '../account/AccountService';
import { setAccessToken } from '../contexts/auth';
import withGap from '../higherOrderComponents/withGap';

const GapBox = withGap(Box);


export default function LoginPopup() {
  const dispatch = useDispatch();

  return (
    <WrapperBox>
      <GapBox
        columnGap="1rem"
        boxSizing="border-box"
        maxWidth="360px"
        padding="2rem"
        bgcolor="rgba(255, 255, 255, 0.75)"
        borderRadius="0.25rem"
      >
        <Box display="flex" justifyContent="center">
          <Intro />
        </Box>
        <LoginForm />
        <Box
          padding="0.5rem"
          borderRadius="0.25rem"
          border="1px solid rgba(0, 0, 0, 0.25)"
          textAlign="center"
        >
          처음이신가요?{' '}
          <Anchor
            style={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch({ type: 'signup' });
            }}
          >
            회원가입
          </Anchor>
        </Box>
        <Box textAlign="center">
          <Anchor
            style={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch({ type: 'none' });
            }}
          >
            로그인하지 않고 이용하기
          </Anchor>
        </Box>
      </GapBox>
    </WrapperBox>
  );
}

function LoginForm() {
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function login() {
    setIsProcessing(true);

    try {
      let res;
      res = await fetchLogin({ identification, password });
      res = await res.json();
      if (res.message) {
        setIsProcessing(false);
        return;
      }
      localStorage.setItem('access-token', res.token);
      setAccessToken(res.token);
      res = await validateLogin();
      res = await res.json();

      if (res.status) {
        return;
      }

      setIsProcessing(false);
      window.location.reload(false);
    } catch (e) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      setIsProcessing(false);
    }
  }

  return (
    <GapBox
      columnGap="1rem"
      padding="1rem"
      bgcolor="rgba(255, 255, 255, 0.75)"
      borderRadius="0.25rem"
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        login();
      }}
    >
      <TextField
        label="아이디"
        size="small"
        variant="outlined"
        autoFocus
        fullWidth
        value={identification}
        onChange={(event) => {
          setIdentification(event.target.value);
        }}
        disabled={isProcessing}
      />
      <TextField
        label="비밀번호"
        size="small"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        disabled={isProcessing}
      />
      <Button
        color="primary"
        variant="contained"
        disableElevation
        type="submit"
        fullWidth
        disabled={isProcessing}
      >
        로그인
      </Button>
      <Divider sx={{ fontSize: '12px', color: 'grey' }}>간편 로그인</Divider>
      <Button
        startIcon={<GitHubIcon />}
        style={{
          backgroundColor: 'black',
          color: 'white',
        }}
        variant="contained"
        href='http://localhost:8090/login/github'
        fullWidth
        disabled={isProcessing}
      >
        GitHub로 로그인하기
      </Button>
    </GapBox >
  );
}

function Intro(props) {
  return (
    <Box fontSize="1.75rem" fontWeight="lighter" {...props}>
      TeamLog에서,
      <br />
      팀의 여정을 기록하세요.
    </Box>
  );
}

function WrapperBox({ children, ...props }) {
  return (
    <Box
      zIndex={99999}
      position="fixed"
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
