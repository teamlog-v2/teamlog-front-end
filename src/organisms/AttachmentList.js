import React from 'react';
import { Grid } from '@material-ui/core';
import Close from '@material-ui/icons/Delete';

const AttachmentList = ({ files, updateFiles }) => (
  <Grid container direction="column" spacing={2}>
    {files.map(({ file }, index) => (
      <Grid key={file.name} item container alignItems="center">
        <u>{file.name}</u>
        <Close
          style={{ cursor: 'pointer' }}
          fontSize="small"
          onClick={() => {
            const newFiles = files.filter((e, i) => index !== i);
            updateFiles(newFiles);
          }}
        />
      </Grid>
    ))}
  </Grid>
);

export default AttachmentList;
