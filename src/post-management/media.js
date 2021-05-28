import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import jQuery from 'jquery';
import { VideoCallRounded } from '@material-ui/icons';
window.$ = window.jQuery = jQuery;

const useStyles = makeStyles(() => ({
  align: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
  },
}));

export const Media = ({ file }) => {
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

  // const image = new Image();
  // image.src = fileDownloadUri;

  // if (image.width >= image.height) {
  return (
    <Box width="100%" className={classes.align}>
      <img src={fileDownloadUri.slice(fileDownloadUri.indexOf('/resources'))} width="100%" />
    </Box>
  );
  // }
  //   return (
  //     <Box height="100%" className={classes.align}>
  //       <img src={fileDownloadUri} height="100%" />
  //     </Box>
  //   );
};

const Video = (props) => {
  const { fileName, fileDownloadUri } = props.file;
  const [notSupportedFormat, setNotSupportedFormat] = useState(false);

  useEffect(async () => {
    const result = await new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => (resolve(video.videoWidth === 0));
      video.onerror = (error) => (reject(error));
      video.src = fileDownloadUri;
      video.remove();
    });
    setNotSupportedFormat(result);
  }, []);

  const url = fileDownloadUri.slice(fileDownloadUri.indexOf('/resources'));
  const classes = useStyles();

  return notSupportedFormat ? (
    <Box>
      <Grid className={classes.align} container xs={12} alignItems="center" justify="center"
      style={{ color: 'white', fontSize: 'larger' }} direction="column">
        <VideoCallRounded fontSize="large" />
        {fileName}
        <span style={{ opacity: 0.6, margin: '1%' }}>(브라우저에서 지원하지않는 형식입니다)</span>
      </Grid>
    </Box>
  ) : (
    <Box>
      <video className={classes.align} controls autoPlay muted>
        <source src={url}></source>
      </video>
    </Box>
  )
};
