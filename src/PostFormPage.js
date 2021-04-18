import React, { useState, useRef } from 'react';
import {
  Grid,
  TextField,
  Paper,
} from '@material-ui/core';
import PlacesSearch from './Organisms/PlacesSearch';
import ThumbnailList from './Organisms/ThumbnailList';
import AccessModifier from './Organisms/AccessModifier';
import HashtagInput from './Organisms/HashtagInput';
import HashtagRecommender from './Organisms/HashtagRecommender';
import PostCreator from './Organisms/PostCreator';
import MediaUploader from './Organisms/MediaUploader';
import AttachmentUploader from './Organisms/AttachmentUploader';
import AttachmentList from './Organisms/AttachmentList';
import VideoCall from '@material-ui/icons/VideoCall';


const App = () => {
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [location, setLocation] = useState('');
  const contentRef = useRef(null);
  const [hashtags, setHashtags] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]); // 썸네일
  const [attachedFiles, setAttachedFiles] = useState([]);

  const [recommendedHashtags, setRecommendedHashtags] = useState([
    {
      key: '1',
      name: '스토리보드',
    },
    {
      key: '2',
      name: '일본',
    },
  ]);

  const submitPost = () => {
    alert('작성완료!');
    console.log({
      isLockOpen,
      location,
      uploadFiles,
      attachedFiles,
      content: contentRef.current.value,
      hashtags,
    });
  };

  return (<Grid container direction='column' alignItems='center'>
            <Grid container spacing={3}>
                  <Grid container item direction='row' justify='space-between'>
                    <Grid container item  direction='column' spacing={1}>
                      <Grid item>
                        <PlacesSearch updateLocation={setLocation} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField value={location} fullWidth/>
                      </Grid>
                    </Grid>
                    <AccessModifier isLockOpen={isLockOpen} updateLockOpen={setIsLockOpen} />
                  </Grid>
                  <Grid container item spacing={1}>
                    <AttachmentUploader files={attachedFiles} updateFiles={setAttachedFiles}/>
                    <Grid item xs={12}>
                      <Paper elevation={0} style={{ backgroundColor: '#F8F8F8', padding: '1%' }}>
                      {(() => {
                        if (attachedFiles.length > 0) {
                          return (<AttachmentList files={attachedFiles} updateFiles={setAttachedFiles} />);
                        }
                        return (<span>업로드된 파일이 없어요.</span>);
                      })()
                      }
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={1}>
                    <MediaUploader files={uploadFiles} updateFiles={setUploadFiles}/>
                    <Grid item xs={12}>
                      <Paper elevation={0} style={{ backgroundColor: '#F8F8F8', padding: '1%' }}>
                      {
                        uploadFiles.length > 0
                          ? <ThumbnailList files={uploadFiles} updateFiles={setUploadFiles}/>
                          : <span>업로드된 파일이 없어요.</span>
                      }
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
                      <Grid item>
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <HashtagInput hashtags={hashtags} updateHashtags={setHashtags}/>
                          </Grid>
                          <Grid item>
                            <HashtagRecommender hashtags={hashtags}
                            recommendedHashtags={recommendedHashtags} updateHashtags={setHashtags}/>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid />
                      <PostCreator submitPost={submitPost}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
      );
    };

export default App;
