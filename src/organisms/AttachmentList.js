import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';

const AttachmentList = ({ files, updateFiles }) => (
  <Grid container direction="column" spacing={2}>
    {files.map(({ name }, index) => (
      <Grid key={name} item>
        <div>
          <u>{name}</u>
          <Cancel
            style={{ cursor: 'pointer' }}
            fontSize="small"
            onClick={() => {
            const newFiles = files.filter((e, i) => index !== i);
            updateFiles(newFiles);
          }}
          />
        </div>
      </Grid>
      ))}
  </Grid>
);

export default AttachmentList;
