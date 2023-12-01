import Close from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import React from 'react';

const AttachmentList = ({ files, updateFiles, handleDeleteList }) => (
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
            if (file.id) handleDeleteList(file.id);
          }}
        />
      </Grid>
    ))}
  </Grid>
);

export default AttachmentList;
