import React from 'react';
import Grid from '@material-ui/core/Grid';
import Attachment from '@material-ui/icons/Attachment';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      padding: '1%',
      borderTop: '1px solid #eee',
    },
    '& > :last-child': {
      borderBottom: '1px solid #eee',
    },
  },
}));

const FileList = ({ files }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {
      files.map((file) => (
        <Grid container alignItems="center">
          <div>
            <Attachment style={{ height: '15px' }} />
            <a
              href={file.fileDownloadUri}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              {file.fileName}
            </a>
          </div>
        </Grid>
      ))
      }
    </Grid>
    );
};

export default FileList;
