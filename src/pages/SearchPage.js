import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { CollectionsBookmark, Group, Search } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectItem from '../project/ProjectItem';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('PROJECT'); // PROJECT or USER
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState([]);
  const lastPromise = useRef(null);

  useEffect(() => {
    if (!query) {
      lastPromise.current = null;
      setResult([]);
      setIsProcessing(false);
      return;
    }
    setIsProcessing(true);

    if (type === 'PROJECT') {
      (async () => {
        const promise = fetch(`/api/projects?name=${query}`);
        lastPromise.current = promise;
        const res = await promise;
        const projects = await res.json();
        if (promise !== lastPromise.current) {
          return;
        }

        setResult(projects);
        setIsProcessing(false);
      })();
    }

    if (type === 'USER') {
      (async () => {
        const promise = fetch(`/api/users?name=${query}`);
        lastPromise.current = promise;
        // 병렬처리도 가능하긴 함
        const res = await promise;
        const users1 = await res.json();
        const res2 = await fetch(`/api/users?id=${query}`);
        const users2 = await res2.json();
        if (promise !== lastPromise.current) {
          return;
        }

        // 중복 제거
        const users = [...users1, ...users2];
        const ids = {};
        const filterdUsers = [];
        users.forEach((user) => {
          if (ids[user.id]) {
            return;
          }
          ids[user.id] = true;
          filterdUsers.push(user);
        });

        setResult(filterdUsers);
        setIsProcessing(false);
      })();
    }
  }, [query, type]);

  // 이하 렌더링 ========
  return (
    <Template>
      <Divider />
      <div style={{ height: '1rem' }} />

      <Typography variant="h4" align="center">
        검색
      </Typography>
      <div style={{ height: '1rem' }} />

      <Divider />
      <div style={{ height: '1rem' }} />

      <Box display="flex">
        <RadioButton
          highlight="PROJECT"
          value={type}
          onClick={() => {
            setType('PROJECT');
          }}
        >
          <CollectionsBookmark />
          <Box minWidth="0.5rem" />
          프로젝트 검색
        </RadioButton>
        <Box minWidth="1rem" />
        <RadioButton
          highlight="USER"
          value={type}
          onClick={() => {
            setType('USER');
          }}
        >
          <Group />
          <Box minWidth="0.5rem" />
          사용자 검색
        </RadioButton>
      </Box>
      <Box marginBottom="1rem" />
      <QueryInput
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <Box marginBottom="1rem" />
      <Box textAlign="center">
        {isProcessing && <CircularProgress />}
        {(() => {
          if (isProcessing) {
            return null;
          }

          if (type === 'PROJECT') {
            return result.map((project) => (
              <>
                <ProjectItem key={project.id} project={project} />
                <Box marginBottom="1rem" />
              </>
            ));
          }

          if (type === 'USER') {
            return result.map((user) => (
              <>
                <UserItem key={user.id} user={user} />
                <Box marginBottom="1rem" />
              </>
            ));
          }
        })()}
      </Box>
    </Template>
  );
}

// 이하 중요하지 않음 ========
const useStyles = makeStyles(() => ({
  profileImg: {
    margin: '10px',
    width: '60px',
    height: '60px',
  },
}));

function UserItem({ user }) {
  const classes = useStyles();

  return (
    <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
      <Card elevation={2}>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.profileImg} src={user.profileImgPath} />
          <Typography variant="body1" color="textPrimary">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            ({user.id})
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}

function RadioButton({ children, onClick, highlight, value, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
      color={highlight === value ? 'primary' : 'default'}
      {...props}
    >
      {children}
    </Button>
  );
}

function QueryInput({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder="검색어를 입력하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search style={{ fontSize: '1.5rem' }} />
          </InputAdornment>
        ),
        style: {
          fontSize: '1rem',
        },
      }}
      style={{
        width: '100%',
      }}
      autoFocus
      variant="outlined"
    />
  );
}

function Template({ children, ...props }) {
  return (
    <Box maxWidth="480px" margin="auto" padding="1rem" {...props}>
      <Box height="4rem" />
      {children}
      <Box height="4rem" />
    </Box>
  );
}
