import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { isDuplicateData } from '../utils';

const StyledChip = styled.input`
  width: ${(props) => (props.isInput ? '150px;' : `${props.value.length * 12}px;`)}
  cursor: ${(props) => (props.isInput ? 'text;' : 'pointer;')}
  text-align: ${(props) => (props.isInput ? 'none;' : 'center;')}
  font-size: 13px;
  border-style: none;
  color: ${(props) => (props.isInput ? 'black;' : 'white;')};
  background-color: ${(props) => (props.isInput ? 'none;' : '#593875;')};
  border-radius: 500px;
  padding: ${(props) => (props.isInput ? '8px 0' : '8px 15px;')};
  &:focus{
    outline: none;
  }
  &:hover{
    ${(props) => (props.isInput ? 'none;' : 'background-color: #722387;')}
  }
  transition: 0.3s;
`;

const HashtagInput = ({ postData, updatePostData }) => {
  const { hashtags } = postData;

  const deleteHashtag = (index) => {
    const newHashtags = [...hashtags];
    newHashtags.splice(index, 1);
    updatePostData({
      ...postData,
      hashtags: newHashtags,
    });
  };

  const handleClick = (index) => (event) => {
    deleteHashtag(index);
  };

  const handleInput = (event) => {
    const { keyCode, target } = event;
    const { value } = target;

    if (keyCode === 8 && value === '') {
      // backspace
      event.preventDefault();
      deleteHashtag(hashtags.length - 1, 1);
    } else if (keyCode === 13) {
      // enter
      const newHashtags = [...hashtags];
      if (value === '') return;
      if (isDuplicateData(hashtags, value)) {
        alert('이미 입력된 태그입니다!');
      } else {
        newHashtags.push(value);
        updatePostData({
          ...postData,
          hashtags: newHashtags,
        });
      }
      target.value = '';
    }
  };

  return (
    <Grid container item>
      <Grid container direction="row" spacing={1}>
        {hashtags.length > 0
          ? hashtags.map((item, index) => (
            <Grid item>
              <StyledChip
                key={index}
                type="text"
                value={item}
                readOnly
                onClick={handleClick(index)}
              />
            </Grid>
            ))
          : null}
        <Grid item>
          <StyledChip
            isInput
            type="text"
            placeholder="해시태그를 입력하세요."
            onKeyDown={handleInput}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HashtagInput;
