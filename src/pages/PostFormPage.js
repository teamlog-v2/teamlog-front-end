import React, { useState, useRef, useEffect } from 'react';
import { Grid, TextField, Paper, makeStyles, Typography, InputAdornment, Button, Divider, Tooltip, InputBase } from '@material-ui/core';
import PlacesSearchApi from '../organisms/PlacesSearchApi';
import ThumbnailList from '../organisms/ThumbnailList';
import AccessModifier from '../organisms/AccessModifier';
import HashtagInput from '../organisms/HashtagInput';
import HashtagRecommender from '../organisms/HashtagRecommender';
import PostCreator from '../organisms/PostCreator';
import Uploader from '../organisms/Uploader';
import AttachmentList from '../organisms/AttachmentList';
import CommentModifier from '../organisms/CommentModifier';
import ImageResize from 'image-resize';
import { getFormat } from '../utils';
import { Backspace, LocationOn } from '@material-ui/icons';
import { useParams } from 'react-router';

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
  const { updateOpen, updatePostLoading, updateFormData } = props;

  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostPublic, setIsPostPublic] = useState(false);
  const [isCommentPublic, setIsCommentPublic] = useState(false);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({});
  const contentRef = useRef(null);
  const [hashtags, setHashtags] = useState([]); 
  const [mediaFiles, setMediaFiles] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [recommendedHashtags, setRecommendedHashtags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async () => {

    if (contentRef.current.value === '') {
      alert('등록할 내용이 없습니다.');
      return;
    };

    const formData = new FormData();

    const data = {
      projectId: id,
      contents: contentRef.current.value,
      accessModifier: isPostPublic ? 'PUBLIC' : 'PRIVATE',
      commentModifier: isPostPublic ? 'PUBLIC' : 'PRIVATE',
      latitude: location.latitude,
      longitude: location.longitude,
      hashtags,
    };

    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    attachedFiles.forEach(({ file }) => {
      formData.append('files', file);
    });

    const imageResize = new ImageResize();

    // 이미지 압축
    try {
      const blobs = await Promise.all(mediaFiles.map(async ({ file, url }) => {
        const width = await new Promise((resolve, reject) => {
          const image = new Image();
          image.src = url;
          image.onload = () => (resolve(image.width));
          image.onerror = () => (reject('이미지 읽는 중 오류 발생'));
        });

        let newWidth = 0;

        if (file.size > 300000)  {
          newWidth = Math.ceil(width * Math.sqrt(300000/file.size)); // 목표: 약 300kb
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
      mediaFiles.forEach(({ file }, index) => {
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
    setIsFormLoaded(true);
    updateFormData(formData);
    updatePostLoading(true);
    updateOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setRecommendedHashtags([
        // hashtag 추천 api 필요
        {
          key: '1',
          name: '스토리보드',
        },
        {
          key: '2',
          name: '일본',
        },
      ]);
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
    >
      <Grid container spacing={3}>
        <Grid container item direction="row" justify="space-between">
          <Grid container item direction="column">
            <Grid item container direction="row" style={{ height: '50px' }} >
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
                              <LocationOn color="primary" style={{ paddingBottom: '2px' }}/>
                            </InputAdornment>
                          )
                        }}
                        value={address}
                        onClick={() => { setIsSearching(true); }}
                    />
                  </Grid>
                  <Tooltip title="취소">
                    <Backspace
                      onClick={() => { setAddress(''); setLocation({}); }}
                      style={{ margin: '5px 0', color: '#DBDBDB', cursor: 'pointer' }}
                    />
                  </Tooltip>
                </>
                )
                : (
                  <PlacesSearchApi
                  address={address}
                  updateIsSearching={setIsSearching}
                  updateLocation={setLocation}
                  updateAddress={setAddress}
                  />
                )
              }
            </Grid>
          </Grid>
          <Grid item container xs={12} justify="flex-end">
            <AccessModifier
              isPostPublic={isPostPublic}
              updateIsPostPublic={setIsPostPublic}
            />
            <CommentModifier
              isCommentPublic={isCommentPublic}
              updateIsCommentPublic={setIsCommentPublic}
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
          <Divider className={classes.children}/>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            {
              attachedFiles.length > 0 ? (
                <Paper
                  elevation={0}
                  style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
                >
                <AttachmentList
                  files={attachedFiles}
                  updateFiles={setAttachedFiles}
                />
                 </Paper>
              ) : null
            }
          </Grid>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            {
              mediaFiles.length > 0 ? (
                <Paper
                  elevation={0}
                  style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
                >
                <ThumbnailList
                  files={mediaFiles}
                  updateFiles={setMediaFiles}
                />
                 </Paper>
              ) : null
            }
          </Grid>
        </Grid>
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
                    hashtags={hashtags}
                    updateHashtags={setHashtags}
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
                      hashtags={hashtags}
                      recommendedHashtags={recommendedHashtags}
                      updateHashtags={setHashtags}
                    />
                  ) : (
                    '추천 해시태그를 찾는 중입니다'
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid />
            <PostCreator
              isFormLoaded={isFormLoaded}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostForm;
