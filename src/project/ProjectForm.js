import { ArrowLeft, Lock, LockOpen } from '@mui/icons-material';
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/auth';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ProjectForm({ teamIdVal = null, updateOpen }) {
  const classes = useStyles();
  const [accountId] = useContext(AuthContext);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const history = useHistory();

  const [id] = useContext(AuthContext);

  if (!id) {
    history.push('/');
    return null;
  }

  const request = () => {
    const data = {
      name,
      introduction,
      accessModifier: isPrivate ? 'PRIVATE' : 'PUBLIC',
      masterId: id,
      teamId: teamIdVal,
    };

    return fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    });
  };

  const onClickCreate = () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);

    request()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((project) => {
            setIsProcessing(false);
            updateOpen(false);
            history.push(`/projects/${project.id}`);
          });
        } else if (res.status === 400) {
          res.json().then((response) => {
            setIsProcessing(false);
            alert(response.message);
          });
        }
      })
      .catch(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div
      style={{
        margin: 'auto',
        minWidth: '20em',
        maxWidth: '480px',
        padding: '1rem',
      }}
    >
      <Backdrop open={isProcessing} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Divider />
      <div style={{ height: '1rem' }} />

      <Typography variant="h5" align="center">
        프로젝트 생성
      </Typography>
      <div style={{ height: '0.5rem' }} />

      <Divider />
      <div style={{ height: '1rem' }} />

      <Typography color="textSecondary">
        프로젝트명
      </Typography>
      <TextField
        size="large"
        fullWidth
        variant="outlined"
        autoFocus
        placeholder=""
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div style={{ height: '1rem' }} />

      <Typography color="textSecondary">
        간단한 소개
      </Typography>
      <TextField
        multiline
        fullWidth
        rows={3}
        variant="outlined"
        placeholder="소개를 작성하세요"
        value={introduction}
        onChange={(event) => {
          setIntroduction(event.target.value);
        }}
      />
      <div style={{ height: '1rem' }} />

      <Typography color="textSecondary">
        공개 설정
      </Typography>
      <div style={{ display: 'flex' }}>
        <Button
          size="small"
          color={isPrivate ? 'inherit' : 'primary'}
          variant="outlined"
          disableElevation
          startIcon={<LockOpen />}
          onClick={() => {
            setIsPrivate(false);
          }}
          style={{ width: '100%', marginRight: '1rem' }}
        >
          전체 공개
        </Button>
        <Button
          size="small"
          color={!isPrivate ? 'inherit' : 'primary'}
          variant="outlined"
          disableElevation
          startIcon={<Lock />}
          onClick={() => {
            setIsPrivate(true);
          }}
          style={{ width: '100%' }}
        >
          비공개
        </Button>
      </div>
      <div style={{ height: '1rem' }} />

      <Divider />
      <div style={{ height: '1rem' }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Button
          style={{ paddingRight: '1rem' }}
          onClick={() => {
            updateOpen(false);
            // history.goBack();
          }}
        >
          <ArrowLeft />
          나가기
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          style={{ fontSize: '1.0rem' }}
          onClick={onClickCreate}
          size="small"
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}
