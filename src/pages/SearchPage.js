import {
  CollectionsBookmark,
  Group,
  Search
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectItem from '../project/ProjectItem';
import { convertResourceUrl } from '../utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('PROJECT'); // PROJECT or USER
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState([]);
  const lastPromise = useRef(null);
  const focusEl = useRef(null);

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

    if (type === 'TEAM') {
      (async () => {
        const promise = fetch(`/api/teams?name=${query}`);
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
        const promise = fetch(`/api/accounts?name=${query}`);
        lastPromise.current = promise;
        // 병렬처리도 가능하긴 함
        const res = await promise;
        const accounts1 = await res.json();
        if (promise !== lastPromise.current) {
          return;
        }
        const res2 = await fetch(`/api/accounts?id=${query}`);
        const accounts2 = await res2.json();
        if (promise !== lastPromise.current) {
          return;
        }

        // 중복 제거
        const accounts = [...accounts1, ...accounts2];
        const ids = {};
        const filterdAccounts = [];
        accounts.forEach((account) => {
          if (ids[account.id]) {
            return;
          }
          ids[account.id] = true;
          filterdAccounts.push(account);
        });

        setResult(filterdAccounts);
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
            focusEl.current.focus();
          }}
        >
          <CollectionsBookmark />
          <Box minWidth="0.5rem" />
          프로젝트
        </RadioButton>
        <Box minWidth="1rem" />
        <RadioButton
          highlight="USER"
          value={type}
          onClick={() => {
            setType('USER');
            focusEl.current.focus();
          }}
        >
          <Group />
          <Box minWidth="0.5rem" />
          사용자
        </RadioButton>
      </Box>
      <Box marginBottom="1rem" />
      <QueryInput
        reff={focusEl}
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
          if (!query) {
            return null;
          }

          if (result.length === 0) {
            return <Typography>대응하는 결과가 없습니다 😢</Typography>;
          }

          return (
            <>
              <Typography>{result.length}개의 검색 결과</Typography>
              <Box marginBottom="1rem" />
            </>
          );
        })()}
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
            return result.map((account) => (
              <>
                <AccountItem key={account.id} account={account} />
                <Box marginBottom="1rem" />
              </>
            ));
          }

          return <></>
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

function AccountItem({ account }) {
  const classes = useStyles();

  return (
    <Link to={`/accounts/${account.id}`} style={{ textDecoration: 'none' }}>
      <Card elevation={2}>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.profileImg} src={convertResourceUrl(account.profileImgPath)} />
          <Typography variant="body1" color="textPrimary">
            {account.name}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            ({account.id})
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
      color={highlight === value ? 'primary' : 'inherit'}
      {...props}
    >
      {children}
    </Button>
  );
}

function QueryInput({ value, onChange, reff }) {
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
      inputRef={reff}
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
