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
    backgroundColor: 'pink',
    color: 'white'
  },
}));

export const Media = (props) => {
  const { content, frameWidth, frameHeight } = props;
  // alert(content.path);

  // var fileName = content.toString();
  // var fileLength = fileName.length;
  // var startIdx = fileName.lastIndexOf('.');

  // var fileExtention = String(
  //   fileName.substring(startIdx, fileLength).toLowerCase(),
  // );

  if(content.type === 'IMAGE'){
    return (
      <ImageContent content={content} />
    );
    
  }else if(content.type === 'VIDEO'){
    return (
      <VideoContent content={content} />
    );
  }
};

const ImageContent = (props) => {
  const { content } = props;
  const classes = useStyles();

  const image = new Image();
  image.src = content.path.toString();

  return(
       <img src = {process.env.PUBLIC_URL + '/media' + content.path}  height='100%' objectFit='contain'/> 
  );

  // 올릴 때 정사각형으로 자르는 방향은 어떤지...

  // if (image.width >= image.height) {
  //   return (
  //     <Box width="100%" className={classes.align}>
  //       <img src={process.env.PUBLIC_URL + '/media' + content.path} width="100%" />
  //     </Box>
  //   );
  // }
  //   return (
  //     <Box height="100%" className={classes.align}>
  //       <img src={process.env.PUBLIC_URL + '/media' + content.path} height="100%" />
  //     </Box>
  //   );
};

const VideoContent = (props) => {
  const { content, width, height } = props;
  const classes = useStyles();

  const image = new Image();
  image.src = content.toString();
  console.log(image.videoWidth);

  return (
    <Box>
      <video className={classes.align} controls>
        <source src={content.path}></source>
      </video>
    </Box>
  );
};
