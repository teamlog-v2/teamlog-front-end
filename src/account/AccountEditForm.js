import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Popover,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { convertResourceUrl, resizeImage } from '../utils';
import { getAccount, updateAccount, validateLogin } from './AccountService';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  input: {
    display: 'none',
  },
  bold: {
    background: 'black',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const AccountEditForm = ({ match }) => {
  const [___, __, _, setContextProfileImgPath] = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [account, setAccount] = useState({
    id: '',
    name: '',
    profileImgPath: '',
    introduction: '',
  });
  const [name, setName] = useState();
  const [introduction, setIntroduction] = useState();
  const [defaultImage, setDefaultImage] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetName = (value) => {
    if (value.length <= 12) {
      setName(value);
    }
  };

  const handleSetIntroduction = (value) => {
    if (value.length <= 100) {
      setIntroduction(value);
    }
  };

  const handleUpload = (event) => {
    setAnchorEl(null);
    if (event.target.files[0].size > 5242880) {
      alert('이미지는 5Mb 용량까지 가능합니다.');
      return;
    }
    setProfileImg(event.target.files[0]);
    setDefaultImage(false);
  };

  const rollbackImage = () => {
    setAnchorEl(null);
    setProfileImg(null);
    setDefaultImage(false);
  };

  const resetImage = () => {
    setAnchorEl(null);
    setProfileImg(null);
    setDefaultImage(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (name.length === 0) {
      setIsLoading(false);
      alert('최소 1글자 이상 입력해주세요.');
      return;
    }
    const data = {
      name,
      introduction,
      defaultImage,
    };
    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    try {
      if (profileImg) {
        const tempURL = URL.createObjectURL(profileImg);
        const resizedImage = await resizeImage(profileImg, tempURL);
        formData.append('profileImg', resizedImage);
      }
    } catch (error) {
      console.log(error);
      return;
    }

    try {
      const response = await updateAccount(formData);
      if (response.status === 200) {
        history.push(`/accounts/${match.params.accountId}`);
        let res = await validateLogin();
        res = await res.json();
        setContextProfileImgPath(res.profileImgPath);
      } else if (response.status === 400) {
        const res = await response.json();
        alert(res.message);
      }
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      let accountInfo;
      try {
        const response = await getAccount(match.params.accountId);
        accountInfo = await response.json();
      } catch (err) {
        alert(err);
        setIsLoaded(false);
      }
      setAccount(accountInfo);
      setName(accountInfo.name);
      setIntroduction(accountInfo.introduction);
      if (accountInfo.profileImgPath === null) setDefaultImage(true);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return <div />;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          <input
            accept="image/*"
            className={classes.input}
            type="file"
            id="file"
            onChange={handleUpload}
          />
          <label htmlFor="file">
            <ListItem button>프로필 사진 변경</ListItem>
          </label>
          <Divider />
          {(profileImg || defaultImage) && account.profileImgPath !== null ? (
            <>
              <ListItem button onClick={rollbackImage}>
                원래 이미지로 변경
              </ListItem>
            </>
          ) : null}
          {!defaultImage ? (
            <>
              <Divider />
              <ListItem button onClick={resetImage}>
                기본 이미지로 변경
              </ListItem>
            </>
          ) : null}
        </List>
      </Popover>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <IconButton onClick={handleClick}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={(
                  <SmallAvatar>
                    <PhotoCamera />
                  </SmallAvatar>
                )}
              >
                {profileImg ? (
                  <Avatar
                    className={classes.large}
                    src={URL.createObjectURL(profileImg)}
                  />
                ) : (
                  <>
                    {defaultImage ? (
                      <Avatar className={classes.large} />
                    ) : (
                      <Avatar
                        className={classes.large}
                        src={convertResourceUrl(account.profileImgPath)}
                      />
                    )}
                  </>
                )}
              </Badge>
            </IconButton>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="name"
              label="이름"
              name="name"
              defaultValue={name}
              value={name}
              onChange={(event) => handleSetName(event.target.value)}
            />
            <Box display="flex" justifyContent="center">
              <Box>
                <Typography color="primary" variant="caption">
                  {name.length}/12
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              fullWidth
              variant="outlined"
              id="introduction"
              name="introduction"
              label="소개"
              multiline
              rows={5}
              defaultValue={introduction}
              value={introduction}
              onChange={(event) => handleSetIntroduction(event.target.value)}
            />
            <Box display="flex" justifyContent="center">
              <Box>
                <Typography color="primary" variant="caption">
                  {introduction === null ? 0 : introduction.length}/100
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} spacing={2} align="center">
            <Box
              display="flex"
              flexWrap="wrap"
              gridGap="8px"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                완료
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setAlertOpen(true)}
              >
                취소
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ width: 230, textAlign: 'start' }}>
          <DialogContentText id="alert-dialog-description">
            변경사항은 저장되지 않습니다.
            <br />
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <Grid container direction="row" justify="space-evenly">
          <Button onClick={() => history.goBack()} color="primary" autoFocus>
            확인
          </Button>
          <Button
            onClick={() => {
              setAlertOpen(false);
            }}
          >
            취소
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default AccountEditForm;
