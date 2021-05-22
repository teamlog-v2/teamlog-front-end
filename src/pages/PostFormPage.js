import React, { useState, useRef, useEffect } from 'react';
import { Grid, TextField, Paper, makeStyles, InputAdornment, Divider, Tooltip } from '@material-ui/core';
import { Backspace, Close, LocationOn } from '@material-ui/icons';
import ImageResize from 'image-resize';
import { useParams } from 'react-router';
import Geocode from 'react-geocode';
import PlacesSearchApi from '../organisms/PlacesSearchApi';
import ThumbnailList from '../organisms/ThumbnailList';
import AccessModifier from '../organisms/AccessModifier';
import HashtagInput from '../organisms/HashtagInput';
import HashtagRecommender from '../organisms/HashtagRecommender';
import PostCreator from '../organisms/PostCreator';
import Uploader from '../organisms/Uploader';
import AttachmentList from '../organisms/AttachmentList';
import CommentModifier from '../organisms/CommentModifier';
import { getFormat, getTypeofFile } from '../utils';

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
      padding: '0 1%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '5%',
    },
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '3% 0',
    },
    [theme.breakpoints.up('md')]: {
      margin: '1% 0',
    },
  },
}));

const PostForm = (props) => {
  const { id } = useParams();
  const { content, updateOpen, updateFormData, updatePost } = props;

  const classes = useStyles();
  const isUpdateRequest = (content !== undefined);
  const postId = content?.id;

  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const contentRef = useRef(null);
  const [postData, setPostData] = useState({
    accessModifier: 'PRIVATE',
    commentModifier: 'PRIVATE',
    hashtags: [],
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [recommendedHashtags, setRecommendedHashtags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { deletedList: deletedFileIdList, handleDeleteList } = useDeleteData();

  const handleSubmit = async () => {
    if (contentRef.current.value === '') {
      alert('등록할 내용이 없습니다.');
      return;
    }

    const formData = new FormData();

    const data = {
      ...postData,
      projectId: id,
      contents: contentRef.current.value,
      deletedFileIdList,
    };

    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    attachedFiles.forEach(({ file }) => {
      if (!file.id) formData.append('files', file);
    });

    const imageResize = new ImageResize();

    // 이미지 압축
    try {
      const newMedia = mediaFiles.filter((file) => !file.id);

      const blobs = await Promise.all(newMedia.map(async ({ file, type, url }) => {
          if (type === 'VIDEO') return new Blob([file]);

          const width = await new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => (resolve(image.width));
            image.onerror = (error) => (reject(error));
          });

        let newWidth = 0;

        if (file.size > 300000) {
          newWidth = Math.ceil(width * Math.sqrt(300000 / file.size)); // 목표: 약 300kb
        }

        const format = getFormat(file.type);

        if (file.size > 300000 && (format === 'jpg' || format === 'png')) {
          return imageResize.updateOptions({
            format: getFormat(file.type),
            outputType: 'blob',
            quality: 0.85,
            width: newWidth,
          }).play(url);
        }
        return new Blob([file]);
      }));

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
      try {
        if (content.latitude && content.longitude) {
          Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
          Geocode.setLocationType('ROOFTOP');
          Geocode.enableDebug();
          const res = await Geocode.fromLatLng(
            content.latitude, content.longitude,
            );
          console.log(res);
      }
      } catch (err) {
        console.log(err);
      }

      contentRef.current.value = content.contents;
      setPostData({
        accessModifier: content.accessModifier,
        commentModifier: content.commentModifier,
        hashtags: content.hashtags,
      });
      setMediaFiles(content.media.map((file) => ({
          url: file.fileDownloadUri,
          type: getTypeofFile(file.fileName),
          file,
          id: file.id,
        })));
      setAttachedFiles(content.files.map((file) => ({
        file: {
          url: file.fileDownloadUri,
          name: file.fileName,
          id: file.id,
        },
      })));
    }
    setIsLoaded(true);
    // setTimeout(() => {
    //   setRecommendedHashtags([
    //     // hashtag 추천 api 필요
    //     {
    //       key: '1',
    //       name: '스토리보드',
    //     },
    //     {
    //       key: '2',
    //       name: '일본',
    //     },
    //   ]);
    //   setIsLoaded(true);
    // }, 3000);
  }, []);

  return (
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
              <Grid item container direction="row" style={{ height: '50px' }}>
                {
                  !isSearching ? (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          size="small"
                          variant="standard"
                          fullWidth
                          helperText="필드를 눌러 장소를 검색하세요."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment>
                                <LocationOn color="primary" style={{ paddingBottom: '2px' }} />
                              </InputAdornment>
                            ),
                          }}
                          value={address}
                          onClick={() => { setIsSearching(true); }}
                        />
                      </Grid>
                      <Tooltip title="취소">
                        <Backspace
                          onClick={() => {
                            setAddress('');
                            setPostData({ ...postData, latitude: null, longitude: null });
                          }}
                          style={{ margin: '5px 0', color: '#DBDBDB', cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </>
                  )
                  : (
                    <PlacesSearchApi
                      address={address}
                      postData={postData}
                      updateIsSearching={setIsSearching}
                      updatePostData={setPostData}
                      updateAddress={setAddress}
                    />
                  )
                }
              </Grid>
            </Grid>
            <Grid item container xs={12} justify="flex-end">
              <AccessModifier
                postData={postData}
                updatePostData={setPostData}
              />
              <CommentModifier
                postData={postData}
                updatePostData={setPostData}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Uploader
              attachedFiles={attachedFiles}
              updateAttachedFiles={setAttachedFiles}
              mediaFiles={mediaFiles}
              updateMediaFiles={setMediaFiles}
            />
            <Divider className={classes.children} />
          </Grid>
          {attachedFiles.length > 0 ? (
            <Grid container item spacing={1}>
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
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
            <Grid container item spacing={1}>
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              rows={5}
              rowsMax={Infinity}
              multiline
              fullWidth
              inputRef={contentRef}
            />
          </Grid>
          <Grid container item>
            <Grid container item direction="row" justify="space-between">
              <Grid item sm={12}>
                <Grid container direction="column" spacing={2}>
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
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <strong style={{ color: '#828282' }}>
                        이런 해시태그는 어때요?
                      </strong>
                    </Grid>
                    {isLoaded ? (
                      <HashtagRecommender
                        postData={postData}
                        recommendedHashtags={recommendedHashtags}
                        updatePostData={setPostData}
                      />
                    ) : (
                      '추천 해시태그를 찾는 중입니다'
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid />
              <PostCreator
                handleSubmit={handleSubmit}
              />
            </Grid>
            <Grid />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostForm;
