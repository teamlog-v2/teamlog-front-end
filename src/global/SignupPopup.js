import { Link as Anchor, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import withGap from '../higherOrderComponents/withGap';
import { createUser } from '../user/userService';

const GapBox = withGap(Box);

export default function SignupPopup({ handlePopup }) {
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
        <SignupForm handlePopup={handlePopup} />
        <Box
          padding="0.5rem"
          borderRadius="0.25rem"
          border="1px solid rgba(0, 0, 0, 0.25)"
          textAlign="center"
        >
          이미 가입하셨나요?{' '}
          <Anchor
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handlePopup?.('login');
            }}
          >
            로그인
          </Anchor>
        </Box>
        <Box textAlign="center">
          <Anchor
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handlePopup?.(null);
            }}
          >
            나가기
          </Anchor>
        </Box>
      </GapBox>
    </WrapperBox>
  );
}

function SignupForm({ handlePopup }) {
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function signup() {
    setIsProcessing(true);

    const res = await createUser({ identification, password, name });
    if (res.status >= 200 && res.status < 300) {
      alert('회원가입을 축하합니다 ^^');
      handlePopup('login');
    } else {
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
        signup();
      }}
    >
      <TextField
        label="아이디"
        size="small"
        variant="outlined"
        autoFocus
        fullWidth
        required
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
        required
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        disabled={isProcessing}
      />
      <TextField
        label="이름"
        size="small"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(event) => {
          setName(event.target.value);
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
        가입하기
      </Button>
    </GapBox>
  );
}

function Intro(props) {
  return (
    <Box fontSize="1.75rem" fontWeight="lighter" {...props}>
      회원가입
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
