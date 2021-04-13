import React from 'react';
import {
  Grid,
  Chip,
  TextField
} from '@material-ui/core';
import { isDuplicateData } from '../utils';

const Hashtags = ({ hashtags, updateHashtags }) => {
  const onDeleteItem = (index) => {
    const newHashtags = hashtags.filter((item, i) => index !== i);
    updateHashtags(newHashtags);
  }

  return hashtags.map((item, index) => <Chip key={index} label={item} onDelete={() => {
    onDeleteItem(index);
  }}/>);
};

const HashtagInput = ({ hashtags, updateHashtags }) => {
  const handleHashtagInput = (event) => {
    const { charCode, target } = event;
    if (charCode === 13) {
      const newHashtags = [...hashtags];
      if(target.value === '') return;
      if (isDuplicateData(hashtags, target.value)) {
        alert('이미 입력된 태그입니다!');
      } else {
        newHashtags.push(target.value);
        updateHashtags(newHashtags);
      }
      target.value = '';
    }
  };

  return (<Grid container item>
            <Hashtags hashtags={hashtags} updateHashtags={updateHashtags}/>
            <TextField onKeyPress={handleHashtagInput}/>
          </Grid>);
}

export default HashtagInput;