import Attachment from '@mui/icons-material/Attachment';
import { Chip, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { convertDownloadUrl } from '../utils';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    '& .file ': {
      padding: '1%',
      marginLeft: 10,
      '& :hover': {
        opacity: 0.4,
      },
    },
  },
}));

const FileList = ({ files }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Grid className={classes.root}>
      {
        files && (
        <Grid
          container
          item
          alignItems="center"
          onClick={() => { setOpen((isOpen) => !isOpen); }}
        >
          <Tooltip title={`${files[0].fileName} ${files.length > 1 ? `외 ${files.length - 1}개` : ''}`}>
            <Chip label="첨부" color="primary" size="small" icon={<Attachment fontSize="small" />} clickable />
          </Tooltip>
        </Grid>
        )
      }
      { open && (
      files.map((file) => (
        <Grid className="file" container alignItems="center">
          <a
            href={convertDownloadUrl(file.fileDownloadUri)}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {file.fileName}
          </a>
        </Grid>
      )))}
    </Grid>
    );
};

export default FileList;
