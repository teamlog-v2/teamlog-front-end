import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { isDuplicateData } from '../utils';

const StyledChip = styled.input`
  width: ${(props) => (props.isInput ? '150px;' : `${props.value.length * 12}px;`)}
  cursor: ${(props) => (props.isInput ? 'default;' : 'pointer;')}
  text-align: ${(props) => (props.isInput ? 'none;' : 'center;')}
  font-size: smaller;
  border-style: none;
  color: white;
  background-color: #C16AF5;
  border-radius: 500px;
  padding: 8px 15px;
  &:focus{
    outline: none;
  }
  &:hover{
    ${(props) => (props.isInput ? 'none;' : 'background-color: #722387;')}
  }
  &::placeholder{
    color: #F0F0F0;
  }
  transition: 0.3s;
`;

const HashtagInput = ({ hashtags, updateHashtags }) => {
  const deleteHashtag = (index) => {
    const newHashtags = [...hashtags];
    newHashtags.splice(index, 1);
    updateHashtags(newHashtags);
  };

  const handleClick = (index) => {
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
        updateHashtags(newHashtags);
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
                color="primary"
                readOnly
                onClick={() => {
                    handleClick(index);
                  }}
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
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HashtagInput;
