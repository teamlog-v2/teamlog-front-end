import React from 'react';
import {
  Grid,
  Chip,
} from '@material-ui/core';
import styled from 'styled-components';
import { isDuplicateData } from '../utils';

const StyledInput = styled.input`
  font-size: smaller;
  border-style: none;
  color: white;
  background-color: #C16AF5;
  border-radius: 500px;
  padding: 5%;
  &:focus{
    outline: none;
  }
`;

const Hashtags = ({ hashtags }) => (
  <Grid container direction="row" spacing={1}>
    {hashtags.map((item, index) => (
      <Grid item>
        <Chip
          key={index}
          label={`${item}`}
          color="primary"
        />
      </Grid>
    ))}
  </Grid>
);

const HashtagInput = ({ hashtags, updateHashtags }) => {
  const handleHashtagInput = (event) => {
    const { keyCode, target } = event;
    const { value } = target;

    if (keyCode === 8 && value === '') { // backspace
        event.preventDefault();
        const newHashtags = [...hashtags];
        newHashtags.splice(newHashtags.length - 1, 1);
        updateHashtags(newHashtags);
    } else if (keyCode === 13) { // enter
      const newHashtags = [...hashtags];
      if (value === '') return;
      if (isDuplicateData(hashtags, value)) {
        alert('이미 입력된 태그입니다!');
      } else {
        newHashtags.push(value);
        updateHashtags(newHashtags);
      }
      target.value = '';
    }
  };

  return (
    <Grid container item>
      <Grid container direction="row" spacing={1}>
        {hashtags.length > 0
          ? (
            <Grid item>
              <Hashtags
                hashtags={hashtags}
              />
            </Grid>
          )
        : null}
        <Grid item>
          <StyledInput type="text" onKeyDown={handleHashtagInput} color="primary" />
        </Grid>
      </Grid>
    </Grid>
    );
};

export default HashtagInput;
