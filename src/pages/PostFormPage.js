import React, { useState, useRef, useEffect } from 'react';
import { Grid, TextField, Paper, makeStyles, InputAdornment, Divider, Tooltip, Button, Card, ClickAwayListener, CardMedia, CircularProgress, Typography } from '@material-ui/core';
import { Backspace, Close, LocationOn } from '@material-ui/icons';
import { useParams } from 'react-router';
import { Skeleton } from '@material-ui/lab';
import PlacesSearchApi from '../organisms/PlacesSearchApi';
import ThumbnailList from '../organisms/ThumbnailList';
import AccessModifier from '../organisms/AccessModifier';
import HashtagInput from '../organisms/HashtagInput';
import HashtagRecommender from '../organisms/HashtagRecommender';
import PostCreator from '../organisms/PostCreator';
import Uploader from '../organisms/Uploader';
import AttachmentList from '../organisms/AttachmentList';
import CommentModifier from '../organisms/CommentModifier';
import { getTypeofFile, resizeImage } from '../utils';

const useDeleteData = () => {
  const [deletedList, setDeletedList] = useState([]);

  const handleDeleteList = (id) => {
    setDeletedList([...deletedList, id]);
  };

  return { deletedList, handleDeleteList };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0',
      padding: '10% 5%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '5%',
    },
  },
  children: {
    [theme.breakpoints.down('md')]: {
      margin: '2% 0',
    },
  },
}));

const randomHashtags = (hashtags) => {
  if (hashtags.length < 5) { return hashtags; }
  const min = Math.ceil(0);
  const max = Math.floor(hashtags.length);

  const randomIndexes = [];

  while (randomIndexes.length !== 5) {
    const randomIndex = Math.floor(Math.random() * (max - min)) + min;
    if (!randomIndexes.includes(randomIndex)) randomIndexes.push(randomIndex);
  }

  return hashtags.filter((hashtag, index) => randomIndexes.includes(index));
};

const PostForm = (props) => {
  const { id } = useParams();
  const { content, hashtags: projectHashtags, updateOpen, updateFormData, updatePost } = props;

  const classes = useStyles();
  const isUpdateRequest = (content !== undefined);
  const postId = content?.id;

  const [text, setText] = useState('');
  const [postData, setPostData] = useState({
    accessModifier: 'PUBLIC',
    commentModifier: 'PUBLIC',
    hashtags: [],
    address: '',
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [recommendedHashtags, setRecommendedHashtags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { deletedList: deletedFileIdList, handleDeleteList } = useDeleteData();
  const [isLoaded, setIsLoaded] = useState(!isUpdateRequest);

  const handleSubmit = async () => {
    if (text === '') {
      alert('등록할 내용이 없습니다.');
      return;
    }

    const formData = new FormData();

    const data = {
      ...postData,
      projectId: id,
      contents: text,
      deletedFileIdList,
    };

    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    attachedFiles.forEach(({ file }) => {
      if (!file.id) formData.append('files', file);
    });

    // 이미지 압축
    try {
      const newMedia = mediaFiles.filter((file) => !file.id);

      const blobs = await Promise.all(newMedia.map(async ({ file, type, url }) => (
      type === 'VIDEO' ? new Blob([file]) : resizeImage(file, url))));

      newMedia.forEach(({ file }, index) => {
        const blobToFile = new File([blobs[index]], file.name, { type: file.type });
        formData.append('media', blobToFile);
      });
    } catch (error) {
      console.log(error);
      return;
    }

    mediaFiles.forEach((file) => {
      URL.revokeObjectURL(file.url);
    });

    if (isUpdateRequest) { // 업데이트 로직
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          body: formData,
          headers: {},
        });
      if (res.status === 200) {
        const result = await res.json();
        console.log('성공적으로 수정');
        updatePost(postId, result);
        updateOpen(false);
        return;
      }
    } catch (error) {
      console.log(error);
      }
    } else { // 등록로직 -> 부모 컴포넌트에 요청
      updateFormData(formData);
    }
  };

  useEffect(async () => {
    if (content) {
      setText(content.contents);
      setPostData({
        address: content.address,
        accessModifier: content.accessModifier,
        commentModifier: content.commentModifier,
        hashtags: content.hashtags,
      });

      // notSupportedFormat 속성을 가진 기존 미디어 파일 생성
      const settedMediaFiles = await Promise.all([...content.media].map(async (file) => {
        const { id: fileId, contentType, fileName, fileDownloadUri } = file;
        const formatFile = {
          url: fileDownloadUri,
          type: getTypeofFile(contentType),
          fileName,
          id: fileId,
        };

        if (contentType.includes('video')) {
            const notSupportedFormat = await new Promise((resolve, reject) => {
              const video = document.createElement('video');
              video.onloadedmetadata = () => (resolve(video.videoWidth === 0));
              video.onerror = (error) => (reject(error));
              video.src = fileDownloadUri;
              video.remove();
          });
          return ({
            ...formatFile,
            notSupportedFormat,
          });
        }
        return formatFile;
      }));
      setMediaFiles(settedMediaFiles);

      setAttachedFiles(content.files.map((file) => ({
        file: {
          url: file.fileDownloadUri,
          name: file.fileName,
          id: file.id,
        },
      })));
      setIsLoaded(true);
    }
    setRecommendedHashtags(projectHashtags.length !== 0 ? randomHashtags(projectHashtags) : []);
  }, []);

  return isLoaded ? (
    <>
      <Grid item container justify="flex-end">
        <Close onClick={() => { updateOpen(false); }} style={{ cursor: 'pointer', margin: '1%' }} />
      </Grid>
      <Grid
        className={classes.root}
        container
        direction="column"
        alignItems="center"
      >
        <Grid container spacing={3}>
          <Grid container item direction="row" justify="space-between">
            <Grid container item direction="column">
              <Grid item container direction="row" style={{ height: '50px' }} className={classes.children}>
                {
                  !isSearching ? (
                    <>
                      <Grid item xs={8}>
                        <TextField
                          size="small"
                          variant="standard"
                          fullWidth
                          helperText="필드를 눌러 장소를 검색하세요."
                          placeholder="어디를 방문하셨나요?"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment>
                                <LocationOn color="primary" style={{ paddingBottom: '2px' }} />
                              </InputAdornment>
                            ),
                          }}
                          value={postData.address ? postData.address.split('#')[0] : ''}
                          onClick={() => { setIsSearching(true); }}
                        />
                      </Grid>
                      <Tooltip title="취소">
                        <Backspace
                          onClick={() => {
                            setPostData({ ...postData, address: '', latitude: null, longitude: null });
                          }}
                          style={{ margin: '5px 0', color: '#DBDBDB', cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </>
                  )
                  : (
                    <PlacesSearchApi
                      postData={postData}
                      updateIsSearching={setIsSearching}
                      updatePostData={setPostData}
                    />
                  )
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item>
                <HashtagInput
                  postData={postData}
                  updatePostData={setPostData}
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="flex-start"
                xs={12}
                style={{ margin: '2% 0' }}
              >
                <Grid item style={{ width: 150 }}>
                  <Tooltip title="오른쪽 태그들을 눌러보세요" arrow>
                    <span
                      style={{ fontSize: 13, cursor: 'default' }}
                    >
                      이런 해시태그는 어때요?&nbsp;
                    </span>
                  </Tooltip>
                </Grid>
                <HashtagRecommender
                  postData={postData}
                  recommendedHashtags={recommendedHashtags}
                  updatePostData={setPostData}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.children}>
            <Uploader
              attachedFiles={attachedFiles}
              updateAttachedFiles={setAttachedFiles}
              mediaFiles={mediaFiles}
              updateMediaFiles={setMediaFiles}
            />
          </Grid>
          {attachedFiles.length > 0 ? (
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  style={{ backgroundColor: '#F8F8F8', padding: '3%' }}
                >
                  <AttachmentList
                    files={attachedFiles}
                    updateFiles={setAttachedFiles}
                    handleDeleteList={handleDeleteList}
                  />
                </Paper>
              </Grid>
            </Grid>
          ) : null}
          {mediaFiles.length > 0 ? (
            <Grid container item>
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
                >
                  <ThumbnailList
                    files={mediaFiles}
                    updateFiles={setMediaFiles}
                    handleDeleteList={handleDeleteList}
                  />
                </Paper>
              </Grid>
            </Grid>
            ) : null}
          <Grid container item xs={12}>
            <TextField
              variant="outlined"
              rows={5}
              rowsMax={Infinity}
              multiline
              fullWidth
              value={text}
              onChange={(event) => { setText(event.target.value); }}
            />
          </Grid>
          <Grid container item xs={12} justify="flex-end">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <AccessModifier
                postData={postData}
                updatePostData={setPostData}
              />
              <CommentModifier
                postData={postData}
                updatePostData={setPostData}
              />
            </div>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item direction="row" justify="space-between">
              <PostCreator
                handleSubmit={handleSubmit}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <Grid
      className={classes.root}
      container
      xs={12}
      style={{ width: 800, minHeight: 600 }}
    >
      <Skeleton animation="wave" width="100%" height={50} />
      <Skeleton animation="wave" width="100%" height={50} />
      <Skeleton animation="wave" variant="rect" width="100%" height={118} />
      <Skeleton animation="wave" variant="rect" width="100%" height={118} />
    </Grid>
  );
};

export default PostForm;
