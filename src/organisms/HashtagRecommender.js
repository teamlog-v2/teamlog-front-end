import React from 'react';
import { Grid, Chip, Button, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { isDuplicateData } from '../utils';

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      margin: '0 2%',
    },
    [theme.breakpoints.up('md')]: {
      width: '90%',
      margin: '0 1%',
    },
  },
}));

const StyledClickableSpan = styled.span`
  cursor: pointer;
  font-size: 13px;
  &:hover {
    color: #593875;
    font-weight: bolder;
  }
`;

const HashtagRecommender = ({
  recommendedHashtags,
  postData,
  updatePostData,
}) => {
  const classes = useStyles();
  const { hashtags } = postData;

  const handleChipClick = (value) => (event) => {
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
      spacing={1}
      style={{ width: '60%' }}
    >
      {
        recommendedHashtags.length !== 0 ? (
          recommendedHashtags.map((name, index) => (
            <Grid item key={index}>
              <StyledClickableSpan
                role="button"
                tabIndex={0}
                variant="outlined"
                color="default"
                onKeyPress={(event) => {
                  if (event.keyCode === 13) handleChipClick(name);
                }}
                onClick={handleChipClick(name)}
              >
                {name}
              </StyledClickableSpan>
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
