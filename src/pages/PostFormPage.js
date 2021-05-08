import React, { useState, useRef, useEffect } from 'react';
import { Grid, TextField, Paper, makeStyles } from '@material-ui/core';
import PlacesSearch from '../organisms/PlacesSearch';
import ThumbnailList from '../organisms/ThumbnailList';
import AccessModifier from '../organisms/AccessModifier';
import HashtagInput from '../organisms/HashtagInput';
import HashtagRecommender from '../organisms/HashtagRecommender';
import PostCreator from '../organisms/PostCreator';
import MediaUploader from '../organisms/MediaUploader';
import AttachmentUploader from '../organisms/AttachmentUploader';
import AttachmentList from '../organisms/AttachmentList';
import CommentModifier from '../organisms/CommentModifier';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 0',
      padding: '0 1%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0',
      padding: '0 15%',
    },
  },
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '2% 0',
    },
    [theme.breakpoints.up('md')]: {
      margin: '1% 0',
    },
  },
}));

const PostForm = (props) => {
  const { id } = props.match.params;

  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isPostPublic, setIsPostPublic] = useState(false);
  const [isCommentPublic, setIsCommentPublic] = useState(false);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({});
  const contentRef = useRef(null); // contents
  const [hashtags, setHashtags] = useState([]); // tag_list
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [recommendedHashtags, setRecommendedHashtags] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    uploadedFiles.forEach(({ file }) => {
      formData.append('media', file);
    });
    attachedFiles.forEach(({ file }) => {
      formData.append('files', file);
    });

    const data = {
      projectId: id,
      contents: contentRef.current.value,
      writerId: 'jduckling1024',
      accessModifier: isPostPublic ? 'PUBLIC' : 'PRIVATE',
      commentModifier: isPostPublic ? 'PUBLIC' : 'PRIVATE',
      latitude: location.latitude,
      longitude: location.longitude,
      hashtags: hashtags,
    };

    formData.append(
      'key',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    setIsFormLoaded(true);
    await fetch('/api/posts', {
      method: 'POST',
      body: formData,
      headers: {},
    })
      .then((res) => {
        // spring으로부터 json형태의 response를 받음.
        console.log(res);
        setIsFormLoaded(false); // 버튼 활성화
        if (res.status === 201) {
          // get res with http status code
          console.log('성공적으로 등록');
          uploadedFiles.forEach((file) => {
            URL.revokeObjectURL(file.url);
          })
          props.history.push(`/projects/${id}`);
        } else {
          console.log('에러 감지');
        }
      })
      .catch((error) => {
        // 요청이 비정상적으로 처리
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setRecommendedHashtags([
        // fetch로 해시태그 추천 결과
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
          <Grid container item direction="column" spacing={1}>
            <Grid item>
              <PlacesSearch
                updateLocation={setLocation}
                updateAddress={setAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField value={address} fullWidth />
            </Grid>
          </Grid>
          <AccessModifier
            isPostPublic={isPostPublic}
            updateIsPostPublic={setIsPostPublic}
          />
          <CommentModifier
            isCommentPublic={isCommentPublic}
            updateIsCommentPublic={setIsCommentPublic}
          />
        </Grid>
        <Grid container item spacing={1}>
          <AttachmentUploader
            files={attachedFiles}
            updateFiles={setAttachedFiles}
          />
          <Grid item xs={12}>
            <Paper
              elevation={0}
              style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
            >
              {(() => {
                if (attachedFiles.length > 0) {
                  return (
                    <AttachmentList
                      files={attachedFiles}
                      updateFiles={setAttachedFiles}
                    />
                  );
                }
                return <span>업로드된 파일이 없어요.</span>;
              })()}
            </Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={1}>
          <MediaUploader files={uploadedFiles} updateFiles={setUploadedFiles} />
          <Grid item xs={12}>
            <Paper
              elevation={0}
              style={{ backgroundColor: '#F8F8F8', padding: '1%' }}
            >
              {uploadedFiles.length > 0 ? (
                <ThumbnailList
                  files={uploadedFiles}
                  updateFiles={setUploadedFiles}
                />
              ) : (
                <span>업로드된 파일이 없어요.</span>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            rows={10}
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
              updateIsFormUploaded={setIsFormLoaded}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostForm;
