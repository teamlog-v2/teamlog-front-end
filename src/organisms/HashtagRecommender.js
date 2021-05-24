import React from 'react';
import { Grid, Chip } from '@material-ui/core';
import { isDuplicateData } from '../utils';

const HashtagRecommender = ({
  recommendedHashtags,
  postData,
  updatePostData,
}) => {
  const { hashtags } = postData;

  const handleChipClick = (value) => {
    const newHashtags = [...hashtags];
    if (isDuplicateData(hashtags, value)) {
      alert('이미 입력된 태그입니다!');
      return;
    }
    newHashtags.push(value);
    updatePostData({
      ...postData,
      hashtags: newHashtags,
    });
  };

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      xs={8}
      spacing={1}
    >
      {
        recommendedHashtags.length !== 0 ? (
          recommendedHashtags.map((name, index) => (
            <Grid item key={index}>
              <Chip
                label={`${name}`}
                variant="outlined"
                color="default"
                style={{ cursor: 'pointer', fontSize: 11 }}
                onClick={() => {
                  handleChipClick(name);
                }}
              />
            </Grid>
          ))
        ) : (
          <Grid>
            추천할 해시태그가 없어요.
          </Grid>
        )
      }
    </Grid>
  );
};

export default HashtagRecommender;
