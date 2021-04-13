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
  const [uploadFiles, setUploadFiles] = useState([]);
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
  // 미디어 +
  const submitPost = () => {
    alert('작성완료!');
    console.log({
      isLockOpen,
      location,
      content: contentRef.current.value,
      hashtags,
    });
  };

  return (
          <Grid container>
            <Grid item>
              <Grid container item direction="column" spacing={3}>
                <Grid container item direction="row" justify="space-between">
                  <Grid container item sm={5}>
                    <PlacesSearch updateLocation={setLocation} />
                    <TextField variant="outlined" value={location}/>
                  </Grid>
                  <AccessModifier isLockOpen={isLockOpen} updateLockOpen={setIsLockOpen} />
                </Grid>
                <AttachmentUploader files={attachedFiles} updateFiles={setAttachedFiles}/>
                <Grid item>
                  <Paper elevation={0} style={{ backgroundColor: '#F8F8F8', padding: '1%' }}>
                  {
                    attachedFiles.length > 0
                      ? <AttachmentList files={attachedFiles} updateFiles={setAttachedFiles}/>
                      : <span>업로드된 파일이 없어요.</span>
                  }
                  </Paper>
                </Grid>
                <MediaUploader files={uploadFiles} updateFiles={setUploadFiles}/>
                <Grid item>
                  <Paper elevation={0} style={{ backgroundColor: '#F8F8F8', padding: '1%' }}>
                  {
                    uploadFiles.length > 0
                      ? <ThumbnailList files={uploadFiles} updateFiles={setUploadFiles}/>
                      : <span>업로드된 파일이 없어요.</span>
                  }
                  </Paper>
                </Grid>
                <Grid item>
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
          </Grid>
      );
    };

export default App;
