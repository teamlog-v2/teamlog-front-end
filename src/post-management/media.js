import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VerifiedUserOutlined } from '@material-ui/icons';
import jQuery from 'jquery';
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
  const { contentType, fileName, fileDownloadUri } = file;
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
  const { content, width, height } = props;
  const classes = useStyles();

  const image = new Image();
  image.src = content.toString();
  console.log(image.videoWidth);

  return (
    <Box>
      <video className={classes.align} controls>
        <source src={content}></source>
      </video>
    </Box>
  );
};
