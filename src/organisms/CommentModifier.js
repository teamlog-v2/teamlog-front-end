import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

const CommentModifier = ({ isCommentPublic, updateIsCommentPublic }) => (
  <Grid container item justify="flex-end">
    {!isCommentPublic ? (
      <Grid
        item
        onClick={() => {
          updateIsCommentPublic(!isCommentPublic);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <Lock />
          </Grid>
          <Grid item>
            <Typography>내부 멤버만 댓글 작성</Typography>
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <Grid
        item
        onClick={() => {
          updateIsCommentPublic(!isCommentPublic);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <LockOpen />
          </Grid>
          <Grid item>
            <Typography>외부인도 댓글 작성</Typography>
          </Grid>
        </Grid>
      </Grid>
    )}
  </Grid>
);

export default CommentModifier;
