import React from 'react';
import {
  Grid,
  Chip,
} from '@material-ui/core';
import { isDuplicateData } from '../utils';

const HashtagRecommender = ({ recommendedHashtags, hashtags, updateHashtags }) => {
  const handleChipClick = (value) => {
    const newHashtags = [...hashtags];
    if (isDuplicateData(hashtags, value)) {
      alert('이미 입력된 태그입니다!');
      return;
    }
    newHashtags.push(value);
    updateHashtags(newHashtags);
  };

  return (
    <Grid item container direction="row" alignItems="center" spacing={1} sm={10}>
      {recommendedHashtags.map((item) => (
        <Grid item key={item.key}>
          <Chip
            label={`${item.name}`}
            color="secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => { handleChipClick(item.name); }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HashtagRecommender;
