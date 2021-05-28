import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import jQuery from 'jquery';
import { VideoCallRounded } from '@material-ui/icons';
import { detectSupportFormat } from '../utils';
window.$ = window.jQuery = jQuery;

const useStyles = makeStyles(() => ({
  align: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
    color: 'white',
  },
  compressed: {
    height: 400,
    backgroundColor: 'black',
    opacity: 0.9,
    color: 'white',
  }
}));

const Media = ({ file }) => {
  const { contentType } = file;
  // 확장자 판별
  if (contentType.includes('video')) {
    return <Video file={file} width="100%" />; //
  } else if (contentType.includes('image')) {
    return <ImageContent file={file} />;
  }
};

const ImageContent = ({ file }) => {
  const { fileName, fileDownloadUri } = file;
  const classes = useStyles();

  return (
    <Box width="100%" className={classes.align}>
      <img src={fileDownloadUri.slice(fileDownloadUri.indexOf('/resources'))} width="100%" />
    </Box>
  );
};

const Video = ({ file, compressed }) => {
  const { fileName, fileDownloadUri } = file;
  const [notSupportedFormat, setNotSupportedFormat] = useState(false);
  const url = fileDownloadUri.slice(fileDownloadUri.indexOf('/resources'));

  useEffect(async () => {
    const result = await detectSupportFormat(url);
    setNotSupportedFormat(result);
  }, []);

  const classes = useStyles();

  return notSupportedFormat ? (
    <Box>
      <Grid className={!compressed ? classes.align : classes.compressed}
      container xs={12}
      alignItems="center"
      justify="center" 
      direction="column">
        <VideoCallRounded fontSize="large" />
        {fileName}
        <span style={{ opacity: 0.6, margin: '1%' }}>(브라우저에서 지원하지않는 형식입니다)</span>
      </Grid>
    </Box>
  ) : (
    <Box>
      <video className={!compressed ? classes.align : ''} controls autoPlay muted>
        <source src={url}></source>
      </video>
    </Box>
  )
};

export { Media, Video };