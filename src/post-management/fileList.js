import React from 'react';
import Grid from '@material-ui/core/Grid';
import Attachment from '@material-ui/icons/AttachFile';

const FileList = ({ files }) => files.map((file) => (
  <Grid container alignItems="center" style={{ backgroundColor: '#eee' }}>
    <Attachment style={{ height: '15px' }} />
    <a
      href={file.fileDownloadUri}
      style={{ color: 'black', textDecoration: 'none' }}
    >
      {file.fileName}
    </a>
  </Grid>
  ));

export default FileList;
