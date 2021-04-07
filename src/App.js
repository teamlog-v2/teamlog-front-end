import React, { useState, useRef } from 'react';
import { Grid, Paper, Chip, Button, TextField } from '@material-ui/core';
import { Lock, LockOpen, Create } from '@material-ui/icons';

const Hashtags = ({ hashtags }) =>
  hashtags.map((item, index) => <Chip key={index} label={item} />);

const App = () => {
  const [isLockOpen, setIsLockOpen] = useState(1);
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
  const submitPost = () => {
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
        <Grid container item sm={3}>
          <Paper
            onClick={() => {
              setLocation('도쿄 디즈니랜드');
            }}
          >
            🛬좌표를 찍어주세요~
          </Paper>
        </Grid>
        <Grid container item sm={2}>
          {isLockOpen ? (
            <Paper
              elevation={0}
              onClick={() => {
                setIsLockOpen(!isLockOpen);
              }}
            >
              내부 멤버만
              <Lock />
            </Paper>
          ) : (
            <Paper
              elevation={0}
              onClick={() => {
                setIsLockOpen(!isLockOpen);
              }}
            >
              외부에도 공개
              <LockOpen />
            </Paper>
          )}
        </Grid>
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
              <Paper
                onClick={() => {
                  setHashtags(['도쿄', '디즈니랜드', '스토리보드']);
                }}
              >
                <Hashtags hashtags={hashtags} />
              </Paper>
              <TextField
                onKeyPress={(event) => {
                  const { charCode, target } = event;
                  if (charCode === 13) {
                    const newHashtags = [...hashtags];
                    newHashtags.push(target.value);
                    console.log(newHashtags);
                    setHashtags(newHashtags);
                  }
                }}
              />
            </Grid>
            <Grid container item>
              <Paper>
                이런 해시태그는 어때요?
                {recommendedHashtags.map((item) => (
                  <Chip key={item.key} label={item.name} />
                ))}
              </Paper>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container justify="flex-end">
              <Button
                onClick={() => {
                  submitPost();
                }}
              >
                <Create />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
