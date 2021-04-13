import React from 'react';
import {
  Grid,
  Chip
} from '@material-ui/core';
import { isDuplicateData } from '../utils';

const HashtagRecommender = ({ recommendedHashtags, hashtags, updateHashtags }) => (<Grid>
    이런 해시태그는 어때요?
    {recommendedHashtags.map((item) => (
    <Chip key={item.key}
      label={item.name}
      onClick={() => {
        const newHashtags = [...hashtags];
        if(isDuplicateData(hashtags, item.name)){
          alert('이미 입력된 태그입니다!');
          return;
        }
    newHashtags.push(item.name);
    updateHashtags(newHashtags);
    }}
    />))}
  </Grid>);

export default HashtagRecommender;