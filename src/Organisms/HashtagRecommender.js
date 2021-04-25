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
    <Grid>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <strong style={{ color: '#828282' }}>이런 해시태그는 어때요?</strong>
        {recommendedHashtags.map((item) => (
          <Grid item key={item.key}>
            <Chip
              label={`#${item.name}`}
              color="secondary"
              style={{ cursor: 'pointer' }}
              onClick={() => { handleChipClick(item.name); }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default HashtagRecommender;
