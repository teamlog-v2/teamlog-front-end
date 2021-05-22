import {
  Grid,
  Badge,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  Divider,
  Container,
  makeStyles,
  Button,
  TextField,
  withStyles,
  Box,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ImageResize from 'image-resize';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { updateUser, getUser, validateLogin } from './userService';
import AuthContext from '../contexts/auth';
import { resizeImage } from '../utils';

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

const UserEditForm = ({ match }) => {
  const [___, __, _, setContextProfileImgPath] = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    profileImgPath: '',
    introduction: '',
  });
  const [name, setName] = useState();
  const [introduction, setIntroduction] = useState();
  const [defaultImage, setDefaultImage] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (event) => {
    setOpen(false);
    if (event.target.files[0].size > 5242880) {
      alert('이미지는 5Mb 용량까지 가능합니다.');
      return;
    }
    setProfileImg(event.target.files[0]);
    setDefaultImage(false);
  };

  const rollbackImage = () => {
    setOpen(false);
    setProfileImg(null);
    setDefaultImage(false);
  };

  const resetImage = () => {
    setOpen(false);
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
      const response = await updateUser(formData);
      if (response.status === 200) {
        history.push(`/users/${match.params.userId}`);
        let res = await validateLogin();
        res = await res.json();
        setContextProfileImgPath(res.profileImgPath);
      }
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      let userInfo;
      try {
        const response = await getUser(match.params.userId);
        userInfo = await response.json();
      } catch (err) {
        alert(err);
        setIsLoaded(false);
      }
      setUser(userInfo);
      setName(userInfo.name);
      setIntroduction(userInfo.introduction);
      if (userInfo.profileImgPath === null) setDefaultImage(true);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return <div />;
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>프로필 사진 변경</DialogTitle>
        <Divider className={classes.bold} />
        <List>
          <input
            accept="image/*"
            className={classes.input}
            type="file"
            id="file"
            onChange={handleUpload}
          />
          <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
          <label htmlFor="file">
            <ListItem button>프로필 사진 변경</ListItem>
          </label>
          <Divider />
          {(profileImg || defaultImage) && user.profileImgPath !== null ? (
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
      </Dialog>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <IconButton onClick={() => setOpen(true)}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SmallAvatar><PhotoCamera /></SmallAvatar>}
              >
                {profileImg ? (
                  <Avatar
                    className={classes.large}
                    src={URL.createObjectURL(profileImg)}
                  />
                ) : (
                  <>
                    {defaultImage ?
                      <Avatar className={classes.large} /> :
                      <Avatar className={classes.large} src={user.profileImgPath} />}
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
              inputProps={{ maxLength: 12 }}
              defaultValue={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              id="introduction"
              name="introduction"
              label="소개"
              multiline
              rows={5}
              inputProps={{ maxLength: 100 }}
              defaultValue={introduction}
              onChange={(event) => setIntroduction(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} spacing={2} align="center">
            <Box
              display="flex"
              flexWrap="wrap"
              gridGap="8px"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                완료
              </Button>
              <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
                취소
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserEditForm;
