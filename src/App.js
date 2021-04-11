import React, { useState, useRef } from 'react';
import {
  Grid,
  Chip,
  TextField,
  Dialog,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Lock, LockOpen, Create, LocationOn } from '@material-ui/icons';
import PlacesSearch from './PlacesSearch';
import { isDuplicateData } from './utils';

const SimpleDialog = (props) => {
  const { onClose, open, updateLocation } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      {/* <DialogTitle id="simple-dialog-title">위치 선택 API</DialogTitle> */}
      <PlacesSearch updateLocation={updateLocation} onClose={onClose}/>
    </Dialog>
  );
};

const Hashtags = ({ hashtags, updateHashtags }) => {
  const onDeleteItem = (index) => {
    const newHashtags = hashtags.filter((item, i) => index !== i);
    updateHashtags(newHashtags);
  }

  return hashtags.map((item, index) => <Chip key={index} label={item} onDelete={() => {
    onDeleteItem(index);
  }}/>);
};

const App = () => {
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const contentRef = useRef(null);
  const [hashtags, setHashtags] = useState([]);
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
  // 미디어

  const handleClickOpen = () => {
    setOpen(1);
  };

  const handleClose = () => {
    setOpen(0);
  };

  const handleHashtagInput = (event) => {
    const { charCode, target } = event;
    if (charCode === 13) {
      const newHashtags = [...hashtags];
      if (isDuplicateData(hashtags, target.value)) {
        alert('이미 존재하는 태그입니다!');
      } else {
        newHashtags.push(target.value);
        setHashtags(newHashtags);
      }
      target.value = '';
    }
  };

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
    <Grid container item direction="column" spacing={3} sm={7}>
      <Grid container item direction="row" justify="space-between">
        <Grid container item sm={5}>
          <Grid onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
            <LocationOn />
            <Typography variant='span'>어디를 방문하셨나요?</Typography>
          </Grid>
          <TextField variant="outlined" value={location}/>
          <SimpleDialog
            open={open}
            onClose={handleClose}
            updateLocation={setLocation}
          />
        </Grid>
        <Grid container item justify='flex-end'>
          {!isLockOpen ? (
            <Grid item
              onClick={() => {
                setIsLockOpen(!isLockOpen);
              }}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant='span'>내부 멤버만</Typography>
              <Lock />
            </Grid>
          ) : (
            <Grid item
              onClick={() => {
                setIsLockOpen(!isLockOpen);
              }}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant='span'>외부에도 공개</Typography>
              <LockOpen />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <label for="upload"
        style={{ backgroundColor: 'black', color: 'white',
        padding: '1%', cursor: 'pointer' }}>
          사진/동영상/첨부파일
        </label>
        <input id="upload" type="file" multiple
          style={{ display: 'none' }}/>
      </Grid>
      <Grid container item>
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
          <Grid container item spacing={2}>
            <Grid container item>
              <Grid
                onClick={() => {
                  setHashtags(['도쿄', '디즈니랜드', '스토리보드']);
                }}
              >
                <Hashtags hashtags={hashtags} updateHashtags={setHashtags}/>
              </Grid>
              <TextField
                onKeyPress={handleHashtagInput}
              />
            </Grid>
            <Grid container item>
              <Grid>
                이런 해시태그는 어때요?
                {recommendedHashtags.map((item) => (
                  <Chip
                    key={item.key}
                    label={item.name}
                    onClick={() => {
                      const newHashtags = [...hashtags];
                      if(isDuplicateData(hashtags, item.name)){
                        alert('이미 존재하는 태그입니다!');
                        return;
                      }
                      newHashtags.push(item.name);
                      setHashtags(newHashtags);
                    }}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container justify="flex-end">
              <IconButton onClick={() => {
                  submitPost();
                }} style={{ backgroundColor: 'black' }}>
                <Create style={{ color: 'white' }}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
